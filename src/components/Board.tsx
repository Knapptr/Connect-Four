import connectFour, { events } from "../game/app";
import { BoardWrapper } from "./styles/wrappers";
import { useEffect, useState } from "react";
import { BoardInit, Callback } from "../game/types";
import { Cell } from "./styles/components";
import Column from "./Column";

const Board = () => {
  const [board, setBoard] = useState(connectFour.getBoard());

  useEffect(() => {
    const updateBoard: Callback = (data) => {
      setBoard(data as BoardInit);
    };
    events.add("boardChange", updateBoard);
    return () => {
      events.remove("boardChange", updateBoard);
    };
  }, []);
  return (
    <BoardWrapper>
      {board.map((row, index) => {
        /* ROWS */
        return (
          <Column key={`COL-${index}`} index={index}>
            {row.map((cell) => {
              return (
                <Cell
                  key={`CELL:${cell.coords.x},${cell.coords.y}`}
                  occupied={cell.occupied}
                  color={
                    cell.occupied
                      ? connectFour.getPlayerColorByID(cell.occupied)
                      : "white"
                  }
                />
              );
            })}
          </Column>
        );
      })}
    </BoardWrapper>
  );
};

export default Board;
