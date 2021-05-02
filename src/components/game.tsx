import { useEffect, useState } from "react";
import connectFour, { events } from "../game/app";
import { Callback } from "../game/types";
import Players from "./Players";
import Board from "./Board";
import { GameWrapper } from "./styles/wrappers";
const Game = () => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [endState, setEndState] = useState(connectFour.getEndState());
  const [currentPlayer, setCurrentPlayer] = useState(
    connectFour.getCurrentPlayer()
  );
  //subscriptions
  useEffect(() => {
    const updatePlayer: Callback = (data) => {
      setCurrentPlayer(data as { name: string; id: string });
    };
    const updateGameOver: Callback = (data) => {
      setIsGameOver(data as boolean);
    };
    const updateGameEnd: Callback = (data) => {
      setEndState(data as string);
    };

    // subscriptions
    events.add("gameOver", updateGameOver);
    events.add("turnChange", updatePlayer);
    events.add("gameEndChange", updateGameEnd);

    //cleanup
    return () => {
      events.remove("gameOver", updateGameOver);
      events.remove("nameChange", updatePlayer);
      events.remove("gameEndChange", updateGameEnd);
    };
  }, []);
  return (
    <GameWrapper>
      {isGameOver ? (
        <>
          <Board />
          <h1>
            Game Over!{"   "}
            {connectFour.getEndState() === "tie"
              ? "Draw!"
              : connectFour
                  .getPlayerColorByID(connectFour.getEndState() as string)
                  .toUpperCase() + " WINS!"}
          </h1>
          <Players
            currentPlayer={currentPlayer}
            gameOver={true}
            winner={endState}
          />
        </>
      ) : (
        <>
          <Board />
          <h1>Play!</h1>
          <Players
            currentPlayer={currentPlayer}
            gameOver={false}
            winner={endState}
          />
        </>
      )}
    </GameWrapper>
  );
};

export default Game;
