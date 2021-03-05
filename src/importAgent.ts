import JSZip from 'jszip';
import { getAgentConfig } from './getAgentConfig';
import { getIntents } from './getIntents';
import { getUserSays } from './getUserSays';
import { Agent, AgentIntents, AgentUserSays } from './types';

/**
 * Import a zip file containing the DialogFlow (DF) agent exported from the DF console or command-line client.
 * @param file A readable buffer to the agent zip file.
 * @returns An Agent interface representing the imported files.
 */
export async function importAgent(file: Buffer): Promise<Agent> {
  const agentFile = await openAgentFile(file);

  const config = await getAgentConfig(agentFile);

  const intents: AgentIntents = (await getIntents(agentFile)).reduce((map, intent) => {
    map[intent.name] = intent;
    return map;
  }, {} as AgentIntents);

  const userSays: AgentUserSays = (await getUserSays(agentFile)).reduce((map, userSays) => {
    if (!map[userSays.intentName]) map[userSays.intentName] = {};
    map[userSays.intentName][userSays.lang] = userSays;
    return map;
  }, {} as AgentUserSays);

  return {
    config,
    intents,
    userSays,
  };
}

async function openAgentFile(file: Buffer): Promise<JSZip> {
  const zip = JSZip();
  const agentFile = await zip.loadAsync(file);
  return agentFile;
}
