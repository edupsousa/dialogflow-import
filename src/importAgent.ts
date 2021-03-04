import JSZip from 'jszip';
import { getIntents } from './getIntents';
import { getUserSays } from './getUserSays';
import { Agent, AgentIntents, AgentUserSays } from './types';

async function openAgentFile(file: Buffer): Promise<JSZip> {
  const zip = JSZip();
  const agentFile = await zip.loadAsync(file);
  return agentFile;
}

export async function importAgent(file: Buffer): Promise<Agent> {
  const agentFile = await openAgentFile(file);
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
    intents,
    userSays,
  };
}
