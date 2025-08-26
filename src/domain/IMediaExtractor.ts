import { MediaLink } from './MediaLinkModel.js';

export interface IMediaExtractor {
    extractLinks(text: string): string[];
    extractMedia(message: any): Promise<MediaLink | null>;
}