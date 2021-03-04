import { JSZipObject } from 'jszip';
import { AgentFile } from "./AgentFile";
import { IUserSaysFile, IUserSaysPhrase } from './IUserSaysFile';

const USERSAYS_FILENAME_REGEX = /^intents\/(.+)_usersays_(.+)\.json$/g;

export async function getUserSaysFiles(agentFile: AgentFile): Promise<IUserSaysFile[]> {
    return Promise.all(filterUserSaysFiles(agentFile).map(parseUserSaysFile));
}

function filterUserSaysFiles(agentFile: AgentFile): JSZipObject[] {
    return agentFile.filter((path) => USERSAYS_FILENAME_REGEX.test(path));
}

async function parseUserSaysFile(file: JSZipObject): Promise<IUserSaysFile> {
    const contents = await file.async('string');
    try {
        const phrases = JSON.parse(contents) as IUserSaysPhrase[];
        return { ...getIntentNameAndLanguage(file.name), phrases };
    } catch (e) {
        throw new Error(`Error parsing user says file ${file.name}: ${e.message}`);
    }
}

function getIntentNameAndLanguage(userSaysFilename: string): { intentName: string; lang: string } {
    const [[_, intentName, lang]] = [...userSaysFilename.matchAll(USERSAYS_FILENAME_REGEX)];
    return { intentName, lang };
}
