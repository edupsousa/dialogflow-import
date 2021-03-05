import { Intent } from './Intent';
import { UserSays } from './UserSays';

/**
 * A map with intent name as key and Intent as value.
 */
export type AgentIntents = Record<string, Intent>;
/**
 * A map with intent name as key to another map with language code as key and user says as value.
 */
export type AgentUserSays = Record<string, Record<string, UserSays>>;

export interface Agent {
  /**
   * Intents contained by the imported agent.
   */
  intents: AgentIntents;
  /**
   * User says (training phrases) contained by the imported agent.
   */
  userSays: AgentUserSays;
}
