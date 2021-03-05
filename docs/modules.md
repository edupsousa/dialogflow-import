[dialogflow-import](README.md) / Exports

# dialogflow-import

## Table of contents

### Interfaces

- [Agent](interfaces/agent.md)
- [AgentConfig](interfaces/agentconfig.md)
- [Entity](interfaces/entity.md)
- [EntityEntries](interfaces/entityentries.md)
- [EntityEntry](interfaces/entityentry.md)
- [GoogleAssistantConfig](interfaces/googleassistantconfig.md)
- [GoogleAssistantOAuthLinking](interfaces/googleassistantoauthlinking.md)
- [Intent](interfaces/intent.md)
- [IntentAffectedContext](interfaces/intentaffectedcontext.md)
- [IntentMessage](interfaces/intentmessage.md)
- [IntentParameter](interfaces/intentparameter.md)
- [IntentPrompt](interfaces/intentprompt.md)
- [IntentResponse](interfaces/intentresponse.md)
- [UserSays](interfaces/usersays.md)
- [UserSaysPhrase](interfaces/usersaysphrase.md)
- [UserSaysPhrasePart](interfaces/usersaysphrasepart.md)
- [WebhookConfig](interfaces/webhookconfig.md)

### Type aliases

- [AgentEntities](modules.md#agententities)
- [AgentEntityEntries](modules.md#agententityentries)
- [AgentIntents](modules.md#agentintents)
- [AgentUserSays](modules.md#agentusersays)

### Functions

- [importAgent](modules.md#importagent)

## Type aliases

### AgentEntities

Ƭ **AgentEntities**: *Record*<string, [*Entity*](interfaces/entity.md)\>

Defined in: [types/Agent.ts:14](https://github.com/edupsousa/dialogflow-import/blob/49e4aaa/src/types/Agent.ts#L14)

___

### AgentEntityEntries

Ƭ **AgentEntityEntries**: *Record*<string, Record<string, [*EntityEntries*](interfaces/entityentries.md)\>\>

Defined in: [types/Agent.ts:15](https://github.com/edupsousa/dialogflow-import/blob/49e4aaa/src/types/Agent.ts#L15)

___

### AgentIntents

Ƭ **AgentIntents**: *Record*<string, [*Intent*](interfaces/intent.md)\>

A map with intent name as key and Intent as value.

Defined in: [types/Agent.ts:9](https://github.com/edupsousa/dialogflow-import/blob/49e4aaa/src/types/Agent.ts#L9)

___

### AgentUserSays

Ƭ **AgentUserSays**: *Record*<string, Record<string, [*UserSays*](interfaces/usersays.md)\>\>

A map with intent name as key to another map with language code as key and user says as value.

Defined in: [types/Agent.ts:13](https://github.com/edupsousa/dialogflow-import/blob/49e4aaa/src/types/Agent.ts#L13)

## Functions

### importAgent

▸ **importAgent**(`file`: Buffer): *Promise*<[*Agent*](interfaces/agent.md)\>

Import a zip file containing the DialogFlow (DF) agent exported from the DF console or command-line client.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`file` | Buffer | A readable buffer to the agent zip file.   |

**Returns:** *Promise*<[*Agent*](interfaces/agent.md)\>

An Agent interface representing the imported files.

Defined in: [importAgent.ts:24](https://github.com/edupsousa/dialogflow-import/blob/49e4aaa/src/importAgent.ts#L24)
