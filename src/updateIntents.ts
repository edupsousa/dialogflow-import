import { openAgentFile } from './openAgentFile';
import { AgentIntents } from './types';

export async function updateIntents(file: Buffer, intents: AgentIntents): Promise<Buffer> {
  const agentFile = await openAgentFile(file);

  Object.keys(intents).forEach((filename) => {
    const jsonData = JSON.stringify(intents[filename], undefined, 2);
    agentFile.file(`intents/${filename}.json`, jsonData);
  });

  return agentFile.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 6 } });
}
