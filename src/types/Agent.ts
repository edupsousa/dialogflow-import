import { Intent } from './Intent';
import { UserSays } from './UserSays';

export type AgentIntents = Record<string, Intent>;
export type AgentUserSays = Record<string, Record<string, UserSays>>;

export interface Agent {
  intents: AgentIntents;
  userSays: AgentUserSays;
}
