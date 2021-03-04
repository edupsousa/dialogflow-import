export interface IUserSaysFile {
  intentName: string;
  lang: string;
  phrases: IUserSaysPhrase[];
}

export interface IUserSaysPhrase {
  id:         string;
  data:       IUserSaysPhrasePart[];
  isTemplate: boolean;
  count:      number;
  lang:       string;
  updated:    number;
}

export interface IUserSaysPhrasePart {
  text:        string;
  userDefined: boolean;
  meta?:       string;
  alias?:      string;
}
