import { Client, Message } from 'whatsapp-web.js';
import { IMediaExtractor } from '../domain/IMediaExtractor.js';
import { MediaLink } from '../domain/MediaLinkModel.js';
import qrcodeTerminal from 'qrcode-terminal'; // <-- Importa aquí
import qrcode from 'qrcode'; // <-- Agrega esta importación
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname as pathDirname } from 'path';

const __dirname = pathDirname(fileURLToPath(import.meta.url));

type MediaLinksCallback = (mediaLinks: MediaLink[]) => void;

export class WhatsAppService {
    private client: Client;
    private groupId: string;
    private extractor: IMediaExtractor;
    private mediaLinks: MediaLink[] = [];
    private callback?: MediaLinksCallback;

    constructor(config: any, extractor: IMediaExtractor) {
        this.groupId = config.GROUP_ID;
        this.extractor = extractor;
        this.client = new Client({ session: config.SESSION_PATH });
    }

    onMediaLinksExtracted(cb: MediaLinksCallback) {
        this.callback = cb;
    }

    private async exportQrImage(qr: string) {
        const filePath = path.resolve(__dirname, '../../latest-qr.png');
        await qrcode.toFile(filePath, qr);
        console.log(`QR exportado como imagen en: ${filePath}`);
    }

    initialize() {
        // Listener para mostrar el QR correctamente en consola
        this.client.on('qr', async (qr) => {
            console.log('Escanea este QR con WhatsApp:');
            // Genera el QR en consola usando qrcode-terminal
            qrcodeTerminal.generate(qr, { small: true });
            // Exporta el QR como imagen PNG
            await this.exportQrImage(qr);
            // Opcional: guarda el texto del QR
            fs.writeFileSync(path.resolve(__dirname, '../../latest-qr.txt'), qr, 'utf-8');
        });

        this.client.on('ready', () => {
            console.log('Bot listo y conectado a WhatsApp Web');
        });

        this.client.on('message', async (message: Message) => {
            if (message.from === this.groupId) {
                // Extract links
                const links = this.extractor.extractLinks(message.body);
                if (links.length) {
                    this.mediaLinks.push({
                        author: message.author ?? '',
                        timestamp: message.timestamp,
                        links
                    });
                    this.callback?.(this.mediaLinks);
                }
                // Extract media
                if (message.hasMedia) {
                    const mediaLink = await this.extractor.extractMedia(message);
                    if (mediaLink) {
                        this.mediaLinks.push(mediaLink);
                        this.callback?.(this.mediaLinks);
                    }
                }
            }
        });
        this.client.initialize();
    }
}