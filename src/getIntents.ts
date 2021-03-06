import JSZip, { JSZipObject } from 'jszip';
import { Intent } from './types';

export const INTENT_FILENAME_REGEX = /^intents\/(((?!_usersays_).)*)\.json$/;

export async function getIntents(agentFile: JSZip): Promise<[string, Intent][]> {
  return Promise.all(agentFile.file(INTENT_FILENAME_REGEX).map(parseIntentFile));
}

async function parseIntentFile(file: JSZipObject): Promise<[string, Intent]> {
  const contents = await file.async('string');
  try {
    return [getIntentName(file.name), JSON.parse(contents) as Intent];
  } catch (e) {
    throw new Error(`Error parsing intent file ${file.name}: ${e.message}`);
  }
}

function getIntentName(intentFilename: string): string {
  const matches = INTENT_FILENAME_REGEX.exec(intentFilename);
  if (matches === null) throw new Error(`Error extracting intent name from intent file ${intentFilename}`);
  const [_, intentName] = matches;
  return intentName;
}
