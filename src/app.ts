import { config } from './config/config.js';
import { WhatsAppService } from './services/WhatsAppService.js';
import { MediaExtractor } from './services/MediaExtractor.js';
import { exportToJson } from './utils/jsonExport.js';
import { exportToXml } from './utils/xmlExport.js';

const mediaExtractor = new MediaExtractor();
const whatsAppService = new WhatsAppService(config, mediaExtractor);

whatsAppService.onMediaLinksExtracted((mediaLinks) => {
    exportToJson(mediaLinks, config.JSON_EXPORT_PATH);
    exportToXml(mediaLinks, config.XML_EXPORT_PATH);
});

whatsAppService.initialize();