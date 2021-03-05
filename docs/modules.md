[dialogflow-import](README.md) / Exports

# dialogflow-import

## Table of contents

### Interfaces

- [Agent](interfaces/agent.md)
- [Intent](interfaces/intent.md)
- [IntentAffectedContext](interfaces/intentaffectedcontext.md)
- [IntentMessage](interfaces/intentmessage.md)
- [IntentParameter](interfaces/intentparameter.md)
- [IntentPrompt](interfaces/intentprompt.md)
- [IntentResponse](interfaces/intentresponse.md)
- [UserSays](interfaces/usersays.md)
- [UserSaysPhrase](interfaces/usersaysphrase.md)
- [UserSaysPhrasePart](interfaces/usersaysphrasepart.md)

### Type aliases

- [AgentIntents](modules.md#agentintents)
- [AgentUserSays](modules.md#agentusersays)

### Functions

- [importAgent](modules.md#importagent)

## Type aliases

### AgentIntents

Ƭ **AgentIntents**: *Record*<string, [*Intent*](interfaces/intent.md)\>

A map with intent name as key and Intent as value.

Defined in: [types/Agent.ts:7](https://github.com/edupsousa/dialogflow-import/blob/e97dd40/src/types/Agent.ts#L7)

___

### AgentUserSays

Ƭ **AgentUserSays**: *Record*<string, Record<string, [*UserSays*](interfaces/usersays.md)\>\>

A map with intent name as key to another map with language code as key and user says as value.

Defined in: [types/Agent.ts:11](https://github.com/edupsousa/dialogflow-import/blob/e97dd40/src/types/Agent.ts#L11)

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

Defined in: [importAgent.ts:11](https://github.com/edupsousa/dialogflow-import/blob/e97dd40/src/importAgent.ts#L11)
