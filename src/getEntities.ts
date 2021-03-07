import JSZip, { JSZipObject } from 'jszip';
import { Entity } from './types';

export const ENTITY_FILENAME_REGEX = /^entities\/(((?!_entries_).))*\.json$/;

export async function getEntities(agentFile: JSZip): Promise<[string, Entity][]> {
  return Promise.all(agentFile.file(ENTITY_FILENAME_REGEX).map(parseEntityFile));
}

async function parseEntityFile(file: JSZipObject): Promise<[string, Entity]> {
  const contents = await file.async('string');
  try {
    return [getEntityName(file.name), JSON.parse(contents) as Entity];
  } catch (e) {
    throw new Error(`Error parsing entity file ${file.name}: ${e.message}`);
  }
}

function getEntityName(entityFilename: string): string {
  const matches = ENTITY_FILENAME_REGEX.exec(entityFilename);
  if (matches === null) throw new Error(`Error extracting entity name from entity file ${entityFilename}`);
  const [, entityName] = matches;
  return entityName;
}
