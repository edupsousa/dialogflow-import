import JSZip, { JSZipObject } from 'jszip';
import { UserSays, UserSaysPhrase } from './types';

export const USERSAYS_FILENAME_REGEX = /^intents\/(.+)_usersays_(.+)\.json$/;

export async function getUserSays(agentFile: JSZip): Promise<UserSays[]> {
  return Promise.all(agentFile.file(USERSAYS_FILENAME_REGEX).map(parseUserSaysFile));
}

async function parseUserSaysFile(file: JSZipObject): Promise<UserSays> {
  const contents = await file.async('string');
  try {
    const phrases = JSON.parse(contents) as UserSaysPhrase[];
    return { ...getIntentNameAndLanguage(file.name), phrases };
  } catch (e) {
    throw new Error(`Error parsing user says file ${file.name}: ${e.message}`);
  }
}

function getIntentNameAndLanguage(userSaysFilename: string): { intentName: string; lang: string } {
  const matches = USERSAYS_FILENAME_REGEX.exec(userSaysFilename);
  if (matches === null)
    throw new Error(`Error extracting intent name and language from user says file ${userSaysFilename}`);
  const [_, intentName, lang] = matches;
  return { intentName, lang };
}
