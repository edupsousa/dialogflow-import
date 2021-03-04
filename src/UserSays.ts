export interface UserSays {
  intentName: string;
  lang: string;
  phrases: UserSaysPhrase[];
}

export interface UserSaysPhrase {
  id:         string;
  data:       UserSaysPhrasePart[];
  isTemplate: boolean;
  count:      number;
  lang:       string;
  updated:    number;
}

export interface UserSaysPhrasePart {
  text:        string;
  userDefined: boolean;
  meta?:       string;
  alias?:      string;
}
