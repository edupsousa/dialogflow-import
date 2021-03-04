import JSZip, { JSZipObject } from 'jszip';
import { IIntentFile } from './IIntentFile';
import { IUserSaysFile, IUserSaysPhrase } from './IUserSaysFile';

const INTENT_FILENAME_REGEX = /^intents\/((?!_usersays_).)*\.json$/g;
const USERSAYS_FILENAME_REGEX = /^intents\/(.+)_usersays_(.+)\.json$/g;

export type AgentFile = JSZip;

export async function openAgentFileBuffer(fileBuffer: Buffer): Promise<AgentFile> {
    const zip = JSZip();
    const agentFile = await zip.loadAsync(fileBuffer);
    return agentFile;
}

export async function getIntentFiles(agentFile: AgentFile): Promise<IIntentFile[]> {
    return Promise.all(filterIntentFiles(agentFile).map(parseIntentFile));
}

function filterIntentFiles(agentFile: AgentFile): JSZipObject[] {
    return agentFile.filter((path) => INTENT_FILENAME_REGEX.test(path));
}

async function parseIntentFile(file: JSZipObject): Promise<IIntentFile> {
    const contents = await file.async('string');
    try {
        return JSON.parse(contents) as IIntentFile;
    } catch (e) {
        throw new Error(`Error parsing intent file ${file.name}: ${e.message}`);
    }
}

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
