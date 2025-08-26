import { IMediaExtractor } from "../domain/IMediaExtractor.js";
import { MediaLink } from "../domain/MediaLinkModel.js";

export class MediaExtractor implements IMediaExtractor {
    private urlRegex = /(https?:\/\/[^\s]+)/g;
    private allowedDomains = [
        /youtube\.com/,
        /youtu\.be/,
        /bandcamp\.com/,
        /soundcloud\.com/
    ];
    private allowedExtensions = /\.(mp3|mp4)$/;

    extractLinks(text: string): string[] {
        const matches = text.match(this.urlRegex) || [];
        return matches.filter(url =>
            this.allowedDomains.some(domain => domain.test(url)) ||
            this.allowedExtensions.test(url)
        );
    }

    async extractMedia(message: any): Promise<MediaLink | null> {
        if (!message.hasMedia) return null;
        const media = await message.downloadMedia();
        return {
            author: message.author,
            timestamp: message.timestamp,
            links: [],
            mediaInfo: {
                mimetype: media.mimetype,
                filename: media.filename,
                size: media.data.length,
            }
        };
    }
}