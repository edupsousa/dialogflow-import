import JSZip from 'jszip';

export async function openAgentFile(file: Buffer): Promise<JSZip> {
  const zip = JSZip();
  const agentFile = await zip.loadAsync(file);
  return agentFile;
}
