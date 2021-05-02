import connectFour, { events } from "../game/app";
import { useState, useEffect } from "react";
import { Callback } from "../game/types";
import { PlayersWrapper } from "./styles/wrappers";
import { PlayerInfo } from "./styles/components";
const Players = ({
  currentPlayer,
  gameOver,
  winner,
}: {
  winner?: string | false;
  gameOver: boolean;
  currentPlayer: { id: string; name: string };
}) => {
  const [players, setPlayers] = useState(connectFour.getPlayers());
  console.log(gameOver);
  //sub to players
  useEffect(() => {
    const updatePlayers: Callback = (data) => {
      setPlayers(data as []);
    };
    events.add("nameChange", updatePlayers);
    //cleanup
    return () => {
      events.remove("nameChange", updatePlayers);
    };
  }, []);

  return (
    <PlayersWrapper>
      <div className="list">
        {gameOver
          ? players.map((player) => (
              <PlayerInfo
                isWinner={winner === player.id}
                isCurrentPlayer={currentPlayer.id === player.id}
                color={connectFour.getPlayerColorByID(player.id)}
                key={`PLAYER-${player.id}`}>
                {player.name}
              </PlayerInfo>
            ))
          : players.map((player) => (
              <PlayerInfo
                isCurrentPlayer={currentPlayer.id === player.id}
                color={connectFour.getPlayerColorByID(player.id)}
                key={`PLAYER-${player.id}`}>
                {player.name}
              </PlayerInfo>
            ))}
      </div>
      {gameOver ? (
        <button
          onClick={() => {
            connectFour.resetGame();
          }}>
          Play Again
        </button>
      ) : null}
    </PlayersWrapper>
  );
};

export default Players;
