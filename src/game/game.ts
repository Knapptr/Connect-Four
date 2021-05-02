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
  boardSize: number[],
  eventManager: EventsManagerInterface
) => {
  let gameOver: boolean = false;
  let endState: false | string = false;
  const players: GamePlayer[] = Array.from(
    playerInitData,
    (playerData: PlayerInit) => CreatePlayer(playerData)
  );

  const getPlayers = () => {
    const playerList: {
      name: string;
      id: string;
      color: "red" | "black";
    }[] = [];
    players.forEach((player) => {
      playerList.push({
        name: player.getName(),
        id: player.id,
        color: player.getColor(),
      });
    });
    return playerList;
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

  let board: GameBoard = CreateBoard(boardSize[0], boardSize[1]);

  const getBoard = () => {
    return board.getBoard();
  };

  let turnCount = 0;

  let currentTurnIndex = 0;

  const advanceTurn = () => {
    turnCount += 1;
    currentTurnIndex += 1;
    if (currentTurnIndex > players.length - 1) {
      currentTurnIndex = 0;
    }
    eventManager.trigger({ action: "turnChange", payload: getCurrentPlayer() });
  };
  const isGameOver = () => {
    if (board.checkForFourInRow()) {
      gameOver = true;
      endState = getCurrentPlayer().id;
    } else {
      if (board.checkIfFilled()) {
        gameOver = true;
        endState = "tie";
      }
    }
    if (gameOver) {
      eventManager.trigger({ action: "gameEndChange", payload: getEndState() });
    }
    return gameOver;
  };

  const getEndState = () => {
    return endState;
  };

  const getCurrentPlayer = () => {
    let player = players[currentTurnIndex];
    let name = player.getName();
    let id = player.id;
    return {
      name,
      id,
    };
  };

  const getTurnCount = () => {
    return turnCount;
  };

  const getPlayerColorByID = (id: string) => {
    let players = getPlayers();
    let player = players.filter((p) => p.id === id)[0];
    let color = player.color;
    return color;
  };
  const takeTurn = (col: number) => {
    if (board.checkIfColFull(col)) return;
    if (gameOver) return;
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
  const resetGame = () => {
    board = CreateBoard(boardSize[0], boardSize[1]);
    turnCount = 0;
    gameOver = false;
    endState = false;
    eventManager.trigger({ action: "boardChange", payload: board.getBoard() });
    eventManager.trigger({ action: "gameEndChange", payload: getEndState() });
    eventManager.trigger({ action: "turnChange", payload: getCurrentPlayer() });
    eventManager.trigger({ action: "turnChange", payload: getCurrentPlayer() });
    eventManager.trigger({ action: "gameOver", payload: false });
  };

  return {
    takeTurn,
    getPlayers,
    setPlayerNames,
    getPlayerNames,
    getTurnCount,
    getCurrentPlayer,
    isGameOver,
    getBoard,
    getPlayerColorByID,
    getEndState,
    resetGame,
  };
};

export default CreateGame;
