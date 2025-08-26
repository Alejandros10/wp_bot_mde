export interface MediaLink {
    author: string ;
    timestamp: number;
    links: string[];
    mediaInfo?: {
        mimetype: string;
        filename?: string;
        size?: number;
    };
}