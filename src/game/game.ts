import CreateBoard from "./board";
import CreatePlayer from "./player";
import {
  EventsManagerInterface,
  GameBoard,
  GamePlayer,
  PlayerInit,
} from "./types";

const CreateGame = (
  playerInitData: PlayerInit[],
  boardSize: [number, number],
  eventManager: EventsManagerInterface
) => {
  const players: GamePlayer[] = Array.from(
    playerInitData,
    (playerData: PlayerInit) => CreatePlayer(playerData)
  );

  const getPlayers = () => {
    return {
      players: players,
    };
  };
  const getPlayerNames = () => {
    const names: string[] = [];
    players.forEach((player) => {
      names.push(player.getName());
    });
    return names;
  };
  const setPlayerNames = (playerNames: string[]) => {
    players.forEach((player, playerIndex) => {
      player.setName(playerNames[playerIndex]);
    });
    eventManager.trigger({ action: "nameChange", payload: getPlayerNames() });
  };

  const board: GameBoard = CreateBoard(...boardSize);

  let turnCount = 0;

  let currentTurnIndex = 0;

  const advanceTurn = () => {
    turnCount += 1;
    currentTurnIndex += 1;
    if (currentTurnIndex > players.length - 1) {
      currentTurnIndex = 0;
    }
    eventManager.trigger({ action: "turnChange", payload: currentTurnIndex });
  };
  const isGameOver = () => {
    return board.checkForFourInRow();
  };

  const getCurrentPlayer = () => {
    return players[currentTurnIndex];
  };
  const getTurnCount = () => {
    return turnCount;
  };

  const takeTurn = (col: number) => {
    let currentPlayerID = players[currentTurnIndex].id;
    board.placePiece(col, currentPlayerID);
    eventManager.trigger({ action: "boardChange", payload: board.getBoard() });
    if (isGameOver()) {
      // trigger game over, and send info for winning player
      eventManager.trigger({ action: "gameOver", payload: true });
      return;
    }
    advanceTurn();
  };

  return {
    takeTurn,
    getPlayers,
    setPlayerNames,
    getPlayerNames,
    getTurnCount,
    getCurrentPlayer,
    isGameOver,
  };
};

export default CreateGame;
