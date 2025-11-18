export enum GameMode {
  DecimalToBinary = 'decToBin',
  BinaryToDecimal = 'binToDec',
  TimedChallenge = 'timed',
}

export enum GameState {
  Start = 'start',
  Playing = 'playing',
  End = 'end',
}

export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export interface HighScore {
  score: number;
  date: string;
}
