
import * as fs from 'fs';
import * as convert from 'xml-js';
import { MediaLink } from '../domain/MediaLinkModel.js';

export function exportToXml(data: MediaLink[], path: string) {
    const xmlObj = { mediaLinks: { mediaLink: data } };
    const xml = convert.js2xml(xmlObj, { compact: true, spaces: 4 });
    fs.writeFileSync(path, xml);
}