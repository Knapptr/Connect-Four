import CreateGame from "./game";
import { PlayerInit } from "./types";

const dummyEventManager = {
  add: () => {},
  remove: () => {},
  trigger: () => {},
};
const initialPlayers: PlayerInit[] = [
  { name: "Player 1", id: "player_1", color: "red", isAI: false },
  { name: "Player 2", id: "player_2", color: "black", isAI: false },
];
const boardSize: [number, number] = [6, 5];
describe("creating/init game", () => {
  test("creates game with init values", () => {
    let game = CreateGame(initialPlayers, boardSize, dummyEventManager);
    expect(game.getTurnCount()).toEqual(0);
    expect(game.getCurrentPlayer().id).toEqual("player_1");
  });
});

describe("events", () => {
  test("take a turn", () => {
    const game = CreateGame(initialPlayers, boardSize, dummyEventManager);
    game.takeTurn(0);
  });
  test("take a turn to gameOver", () => {
    const game = CreateGame(initialPlayers, boardSize, dummyEventManager);
    game.takeTurn(0);
    game.takeTurn(1);
    game.takeTurn(0);
    game.takeTurn(1);
    game.takeTurn(0);
    game.takeTurn(1);
    game.takeTurn(0);
    expect(game.isGameOver()).toBe(true);
  });
});
