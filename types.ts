export interface DictionaryEntry {
  word: string;
  definition_en: string; // Simplified English
  definition_es: string; // Spanish
  info: string;          // Extra context or fun fact
  link?: string;         // Official documentation URL
}

export enum LetterState {
  CORRECT = 'correct',
  PRESENT = 'present',
  ABSENT = 'absent',
  INITIAL = 'initial',
}

export interface GameState {
  guesses: string[];
  currentGuess: string;
  solution: string;
  definition: string; // Displayed definition based on language
  info: string;
  link?: string;
  isGameOver: boolean;
  hasWon: boolean;
  turn: number;
}