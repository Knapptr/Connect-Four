import EventsManager from "./events";
import CreateGame from "./game";
import { PlayerInit } from "./types";

/////defaultSettings
const defaultPlayers: PlayerInit[] = [
  { name: "Player 1", id: "player_1", isAI: false, color: "red" },
  { name: "Player 2", id: "player_2", isAI: false, color: "black" },
];
const defaultSize = [7, 6];

export const events = EventsManager();
const connectFour = (players = defaultPlayers, size = defaultSize) => {
  return CreateGame(players, size, events);
};

export default connectFour();
