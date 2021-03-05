import JSZip, { JSZipObject } from 'jszip';
import { Entity } from './types';

export const ENTITY_FILENAME_REGEX = /^entities\/((?!_entries_).)*\.json$/;

export async function getEntities(agentFile: JSZip): Promise<Entity[]> {
  return Promise.all(agentFile.file(ENTITY_FILENAME_REGEX).map(parseEntityFile));
}

async function parseEntityFile(file: JSZipObject): Promise<Entity> {
  const contents = await file.async('string');
  try {
    return JSON.parse(contents) as Entity;
  } catch (e) {
    throw new Error(`Error parsing entity file ${file.name}: ${e.message}`);
  }
}
