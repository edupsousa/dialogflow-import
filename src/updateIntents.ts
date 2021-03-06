import { openAgentFile } from './openAgentFile';
import { Intent } from './types';

export async function updateIntents(file: Buffer, intents: Intent[]): Promise<Buffer> {
  const agentFile = await openAgentFile(file);

  intents.forEach((intent) => {
    const jsonData = JSON.stringify(intent, undefined, 2);
    agentFile.file(`intents/${intent.name}.json`, jsonData);
  });

  return agentFile.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 6 } });
}
