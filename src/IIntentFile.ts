export interface IIntentFile {
  id: string;
  name: string;
  auto: boolean;
  contexts: string[];
  responses: IResponse[];
  priority: number;
  webhookUsed: boolean;
  webhookForSlotFilling: boolean;
  fallbackIntent: boolean;
  events: any[];
  conditionalResponses: any[];
  condition: string;
  conditionalFollowupEvents: any[];
}

export interface IResponse {
  resetContexts: boolean;
  action: string;
  affectedContexts: IAffectedContext[];
  parameters: IParameter[];
  messages: IMessage[];
  speech: any[];
}

export interface IAffectedContext {
  name: string;
  lifespan: number;
}

export interface IMessage {
  type: string;
  title: string;
  payload?: unknown;
  textToSpeech: string;
  lang: string;
  condition: string;
  speech?: string[];
}

export interface IPrompt {
  lang: string;
  value: string;
}

export interface IParameter {
  id: string;
  name: string;
  required: boolean;
  dataType: string;
  value: string;
  defaultValue: string;
  isList: boolean;
  prompts: IPrompt[];
  promptMessages: any[];
  noMatchPromptMessages: any[];
  noInputPromptMessages: any[];
  outputDialogContexts: any[];
}
