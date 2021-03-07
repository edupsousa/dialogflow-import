import JSZip, { JSZipObject } from 'jszip';
import { EntityEntries, EntityEntry } from './types';

export const ENTITY_ENTRIES_FILENAME_REGEX = /^entities\/(.+)_entries_(.+)\.json$/;

export async function getEntityEntries(agentFile: JSZip): Promise<EntityEntries[]> {
  return Promise.all(agentFile.file(ENTITY_ENTRIES_FILENAME_REGEX).map(parseEntriesFile));
}

async function parseEntriesFile(file: JSZipObject): Promise<EntityEntries> {
  const contents = await file.async('string');
  try {
    const entries = JSON.parse(contents) as EntityEntry[];
    return { ...getEntityNameAndLanguage(file.name), entries };
  } catch (e) {
    throw new Error(`Error parsing entity entries file ${file.name}: ${e.message}`);
  }
}

function getEntityNameAndLanguage(entriesFilename: string): { entity: string; lang: string } {
  const matches = ENTITY_ENTRIES_FILENAME_REGEX.exec(entriesFilename);
  if (matches === null)
    throw new Error(`Error extracting entity name and language from entries file ${entriesFilename}`);
  const [_, entity, lang] = matches;
  return { entity, lang };
}
