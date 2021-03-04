import { openAgentFileBuffer, getIntents, getUserSays } from '../index';
import { promises as fs } from 'fs';
import { join } from 'path';

const covidSamplePath = join(__dirname, '../../sample/covid-19-agent-template.zip');

test('import sample/covid-19-agent-template.zip agent', async () => {
  const file = await fs.readFile(covidSamplePath);
  const agentFile = await openAgentFileBuffer(file);
  const intents = await getIntents(agentFile);
  console.log(`Imported ${intents.length} intent files.`);
  const userSays = await getUserSays(agentFile);
  console.log(`Imported ${userSays.length} user says files.`);
});
