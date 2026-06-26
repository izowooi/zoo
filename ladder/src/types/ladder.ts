export interface Entry {
  id: string;
  value: string;
}

export interface RevealedResult {
  endCol: number;
  color: string;
}

export type GamePhase = "setup" | "play";
