
import * as fs from 'fs';
import { MediaLink } from '../domain/MediaLinkModel.js';

export function exportToJson(data: MediaLink[], path: string) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}