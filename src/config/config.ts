import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    GROUP_ID: process.env.GROUP_ID || '',
    JSON_EXPORT_PATH: process.env.JSON_EXPORT_PATH || 'media_links.json',
    XML_EXPORT_PATH: process.env.XML_EXPORT_PATH || 'media_links.xml',
    SESSION_PATH: process.env.SESSION_PATH || 'session.json',
};