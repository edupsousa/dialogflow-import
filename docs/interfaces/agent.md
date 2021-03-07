[dialogflow-import](../README.md) / [Exports](../modules.md) / Agent

# Interface: Agent

## Table of contents

### Properties

- [config](agent.md#config)
- [entities](agent.md#entities)
- [entityEntries](agent.md#entityentries)
- [intents](agent.md#intents)
- [userSays](agent.md#usersays)

## Properties

### config

• **config**: [*AgentConfig*](agentconfig.md)

Agent config imported from agent.json file.

Defined in: [types/Agent.ts:29](https://github.com/edupsousa/dialogflow-import/blob/cb3143e/src/types/Agent.ts#L29)

___

### entities

• **entities**: [*AgentEntities*](../modules.md#agententities)

Entities imported from entities/*(!_entries_*).json

Defined in: [types/Agent.ts:33](https://github.com/edupsousa/dialogflow-import/blob/cb3143e/src/types/Agent.ts#L33)

___

### entityEntries

• **entityEntries**: [*AgentEntityEntries*](../modules.md#agententityentries)

Entity entries imported from entities/*_entries_*.json

Defined in: [types/Agent.ts:37](https://github.com/edupsousa/dialogflow-import/blob/cb3143e/src/types/Agent.ts#L37)

___

### intents

• **intents**: [*AgentIntents*](../modules.md#agentintents)

Intents contained by the imported agent (intents/*(!_usersays_*).json).

Defined in: [types/Agent.ts:21](https://github.com/edupsousa/dialogflow-import/blob/cb3143e/src/types/Agent.ts#L21)

___

### userSays

• **userSays**: [*AgentUserSays*](../modules.md#agentusersays)

User says (training phrases) contained by the imported agent (intents/*_userssays_*.json)

Defined in: [types/Agent.ts:25](https://github.com/edupsousa/dialogflow-import/blob/cb3143e/src/types/Agent.ts#L25)
