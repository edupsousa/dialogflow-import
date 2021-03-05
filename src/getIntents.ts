import JSZip, { JSZipObject } from 'jszip';
import { Intent } from './types';

export const INTENT_FILENAME_REGEX = /^intents\/((?!_usersays_).)*\.json$/;

export async function getIntents(agentFile: JSZip): Promise<Intent[]> {
  return Promise.all(agentFile.file(INTENT_FILENAME_REGEX).map(parseIntentFile));
}

async function parseIntentFile(file: JSZipObject): Promise<Intent> {
  const contents = await file.async('string');
  try {
    return JSON.parse(contents) as Intent;
  } catch (e) {
    throw new Error(`Error parsing intent file ${file.name}: ${e.message}`);
  }
}
