import { promises as fs } from 'fs';
import { join } from 'path';
import { importAgent } from '../index';
import { Agent } from '../types';

const covidSamplePath = join(__dirname, '../../sample/covid-19-agent-template.zip');

describe('importAgent correctness', () => {
  let agent: Agent;

  beforeEach(async () => {
    const fileBuffer = await fs.readFile(covidSamplePath);
    agent = await importAgent(fileBuffer);
  });

  test('userSays keys must match intent names', async () => {
    const intents = Object.keys(agent.intents);
    const userSays = Object.keys(agent.userSays);
    expect(intents).toEqual(expect.arrayContaining(userSays));
  });
});
