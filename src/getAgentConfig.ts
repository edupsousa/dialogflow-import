import JSZip from 'jszip';
import { AgentConfig } from './types';

export async function getAgentConfig(agentFile: JSZip): Promise<AgentConfig> {
  const configFile = await agentFile.file('agent.json')?.async('string');
  if (!configFile) throw new Error('Error importing agent config: agent.json file not found!');
  return JSON.parse(configFile) as AgentConfig;
}
