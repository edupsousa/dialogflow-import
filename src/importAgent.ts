import JSZip from 'jszip';
import { AgentFile } from "./AgentFile";

export async function openAgentFileBuffer(fileBuffer: Buffer): Promise<AgentFile> {
    const zip = JSZip();
    const agentFile = await zip.loadAsync(fileBuffer);
    return agentFile;
}
