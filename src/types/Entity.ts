export interface Entity {
  id: string;
  name: string;
  isOverridable: boolean;
  isEnum: boolean;
  isRegexp: boolean;
  automatedExpansion: boolean;
  allowFuzzyExtraction: boolean;
}

export interface EntityEntry {
  value: string;
  synonyms: string[];
}

export interface EntityEntries {
  entity: string;
  lang: string;
  entries: EntityEntry[];
}
