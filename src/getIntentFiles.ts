import { JSZipObject } from 'jszip';
import { AgentFile } from "./AgentFile";
import { IIntentFile } from './IIntentFile';

const INTENT_FILENAME_REGEX = /^intents\/((?!_usersays_).)*\.json$/g;

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
