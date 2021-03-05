import JSZip from 'jszip';
import { getAgentConfig } from './getAgentConfig';
import { getEntities } from './getEntities';
import { getEntityEntries } from './getEntityEntries';
import { getIntents, INTENT_FILENAME_REGEX } from './getIntents';
import { getUserSays, USERSAYS_FILENAME_REGEX } from './getUserSays';
import { openAgentFile } from './openAgentFile';
import {
  Agent,
  AgentIntents,
  AgentUserSays,
  Entity,
  Intent,
  UserSays,
  AgentEntities,
  AgentEntityEntries,
  EntityEntries,
} from './types';

/**
 * Import a zip file containing the DialogFlow (DF) agent exported from the DF console or command-line client.
 * @param file A readable buffer to the agent zip file.
 * @returns An Agent interface representing the imported files.
 */
export async function importAgent(file: Buffer): Promise<Agent> {
  const agentFile = await openAgentFile(file);
  await checkAgentFileStructure(agentFile);

  const config = await getAgentConfig(agentFile);

  const intents: AgentIntents = reduceIntentList(await getIntents(agentFile));
  const userSays: AgentUserSays = reduceUserSaysList(await getUserSays(agentFile));
  const entities: AgentEntities = reduceEntityList(await getEntities(agentFile));
  const entityEntries: AgentEntityEntries = reduceEntriesList(await getEntityEntries(agentFile));

  return {
    config,
    intents,
    userSays,
    entities,
    entityEntries,
  };
}

function reduceEntriesList(entries: EntityEntries[]): AgentEntityEntries {
  return entries.reduce((map, entry) => {
    if (!map[entry.entity]) map[entry.entity] = {};
    map[entry.entity][entry.lang] = entry;
    return map;
  }, {} as AgentEntityEntries);
}

function reduceEntityList(entities: Entity[]): AgentEntities {
  return entities.reduce((map, entity) => {
    map[entity.name] = entity;
    return map;
  }, {} as AgentEntities);
}

function reduceIntentList(intents: Intent[]): AgentIntents {
  return intents.reduce((map, intent) => {
    map[intent.name] = intent;
    return map;
  }, {} as AgentIntents);
}

function reduceUserSaysList(userSays: UserSays[]): AgentUserSays {
  return userSays.reduce((map, userSays) => {
    if (!map[userSays.intentName]) map[userSays.intentName] = {};
    map[userSays.intentName][userSays.lang] = userSays;
    return map;
  }, {} as AgentUserSays);
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
