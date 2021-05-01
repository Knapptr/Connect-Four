import CreateBoard from "./board";
import CreatePlayer from "./player";

export type PlayerInit = {
  name: string;
  color: "red" | "black";
  isAI: boolean;
  id: PlayerID;
};

export type PlayerID = string;

export interface Cell {
  coords: { x: number; y: number };
  occupied: false | PlayerID;
}

export type BoardInit = Cell[][];

//events

export type Callback = (data?: {}) => void;
export type Trigger = (data: { action: string; payload?: {} }) => void;
export type Adder = (eventName: string, fn: Callback) => void;
export type Remover = (eventName: string, fn: Callback) => void;

export type Events = {
  [eventName: string]: Callback[];
};
export interface EventsManagerInterface {
  add: Adder;
  remove: Remover;
  trigger: Trigger;
}

// from return values;
export type GameBoard = ReturnType<typeof CreateBoard>;

export type GamePlayer = ReturnType<typeof CreatePlayer>;
