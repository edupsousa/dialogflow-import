import { JSZipObject } from 'jszip';
import { AgentFile, Intent } from "./types";

const INTENT_FILENAME_REGEX = /^intents\/((?!_usersays_).)*\.json$/g;

export async function getIntents(agentFile: AgentFile): Promise<Intent[]> {
    return Promise.all(filterIntentFiles(agentFile).map(parseIntentFile));
}

function filterIntentFiles(agentFile: AgentFile): JSZipObject[] {
    return agentFile.filter((path) => INTENT_FILENAME_REGEX.test(path));
}

async function parseIntentFile(file: JSZipObject): Promise<Intent> {
    const contents = await file.async('string');
    try {
        return JSON.parse(contents) as Intent;
    } catch (e) {
        throw new Error(`Error parsing intent file ${file.name}: ${e.message}`);
    }
}
