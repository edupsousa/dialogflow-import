import JSZip from 'jszip';
import { getAgentConfig } from './getAgentConfig';
import { getIntents, INTENT_FILENAME_REGEX } from './getIntents';
import { getUserSays, USERSAYS_FILENAME_REGEX } from './getUserSays';
import { Agent, AgentIntents, AgentUserSays } from './types';

/**
 * Import a zip file containing the DialogFlow (DF) agent exported from the DF console or command-line client.
 * @param file A readable buffer to the agent zip file.
 * @returns An Agent interface representing the imported files.
 */
export async function importAgent(file: Buffer): Promise<Agent> {
  const agentFile = await openAgentFile(file);
  await checkAgentFileStructure(agentFile);

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

async function checkAgentFileStructure(agentFile: JSZip): Promise<true> {
  const packageFile = agentFile.file('package.json');
  if (packageFile === null) throw new Error('File package.json not found.');

  const packageContents = JSON.parse(await packageFile.async('string'));
  if (!packageContents.version || packageContents.version !== '1.0.0')
    throw new Error(`Unrecognized package version ${packageContents.version}`);

  if (agentFile.file('agent.json') === null) throw new Error('File agent.json not found.');

  if (agentFile.file(INTENT_FILENAME_REGEX).length === 0) throw new Error("Agent file doesn't contain intents.");
  if (agentFile.file(USERSAYS_FILENAME_REGEX).length === 0)
    throw new Error("Agent file doesn't contain training phrase files (_usersays_).");

  return true;
}

async function openAgentFile(file: Buffer): Promise<JSZip> {
  const zip = JSZip();
  const agentFile = await zip.loadAsync(file);
  return agentFile;
}
