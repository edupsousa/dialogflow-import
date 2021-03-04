import { importAgent } from '../index';
import { promises as fs } from 'fs';
import { join } from 'path';

const covidSamplePath = join(__dirname, '../../sample/covid-19-agent-template.zip');

test('import sample/covid-19-agent-template.zip agent', async () => {
  const file = await fs.readFile(covidSamplePath);
  const agent = await importAgent(file);
  const intents = Object.keys(agent.intents);
  console.log(`Imported ${intents.length} intent files.`);
  const userSays = Object.keys(agent.userSays);
  console.log(`Imported user says for ${userSays.length} intents.`);
});
