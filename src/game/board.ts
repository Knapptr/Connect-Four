import { createSecureContext } from "node:tls";
import { BoardInit, Cell, PlayerID } from "./types";

const CreateBoard = (width: number, height: number) => {
  if (width < 4 || height < 4) {
    throw new Error("Height and width must each be greater than 0");
  }

  const board: BoardInit = Array.from(Array(width), (_colVal, xIndex: number) =>
    Array.from(
      Array(height),
      (_rowVal, yIndex: number): Cell => ({
        coords: { x: xIndex, y: yIndex },
        occupied: false,
      })
    )
  );

  const checkIfColFull = (index: number) => {
    return board[index].every((cell) => cell.occupied);
  };

  const findLowestAvailableRow = (col: number) => {
    const lastSpace = board[col].length - 1;
    if (!board[col][lastSpace].occupied) return lastSpace;
    const firstAvailable =
      board[col].findIndex((cell) => cell.occupied !== false) - 1;
    return firstAvailable;
  };

  const placePiece = (col: number, playerID: PlayerID): void => {
    // check if full, throw if full
    if (checkIfColFull(col)) {
      throw new Error("Column is full!");
    }
    // place piece in 'lowest' space
    const rowIndex = findLowestAvailableRow(col);
    board[col][rowIndex].occupied = playerID;
  };

  const checkForFour = (arr: Cell[]) => {
    // Analyzes an array, and checks if 4 cells in a row in the array are equal
    let consecutive = 1;
    let compareElement: string = arr[0].occupied || "none";
    let currentIndex = 1;
    let isFour = false;

    while (!isFour && currentIndex < arr.length) {
      let currentElement = arr[currentIndex];
      if (currentElement.occupied === compareElement) {
        consecutive += 1;
        if (consecutive >= 4) {
          isFour = true;
        }
        currentIndex += 1;
        continue;
      } else {
        compareElement = currentElement.occupied || "none";
        currentIndex += 1;
        consecutive = 1;
      }
    }
    return isFour;
  };

  const checkVerticalSpaces = () => {
    return board.some((col) => {
      return checkForFour(col);
    });
  };

  const checkHorizontalSpaces = () => {
    let invertedBoard = getHorizontalArrays();
    return invertedBoard.some((row) => {
      return checkForFour(row);
    });
  };

  const getHorizontalArrays = () => {
    // inverts board array to be [rows[cols]]
    let invertedArray: Cell[][] = Array.from(board[0], () => []);
    board.forEach((col) => {
      col.forEach((cellInRow) => {
        invertedArray[cellInRow.coords.y][cellInRow.coords.x] = cellInRow;
      });
    });
    return invertedArray;
  };

  const createBottomToTopDiagonalArrayFromIndex = (indexCell: Cell) => {
    const returnArray = [];
    let x = indexCell.coords.x;
    let y = indexCell.coords.y;
    while (x < board.length && y >= 0) {
      returnArray.push(board[x][y]);
      y -= 1;
      x += 1;
    }
    return returnArray;
  };

  const createTopToBottomDiagonalArrayFromIndex = (indexCell: Cell): Cell[] => {
    const returnArray = [];
    let x = indexCell.coords.x;
    let y = indexCell.coords.y;
    while (x >= 0 && y >= 0) {
      returnArray.push(board[x][y]);
      y -= 1;
      x -= 1;
    }
    return returnArray;
  };

  const createDiagonalsTopToBottom = (): Cell[][] => {
    const allDiagonals = [];
    // push all diagonals from last column
    for (const cell of board[board.length - 1]) {
      allDiagonals.push(createTopToBottomDiagonalArrayFromIndex(cell));
    }
    // push all diagonals from first row except last col
    for (const column of board.slice(0, board.length - 1)) {
      const lastRowIndex = column.length - 1;
      let relevantCell = column[lastRowIndex];
      allDiagonals.push(createTopToBottomDiagonalArrayFromIndex(relevantCell));
    }
    //filter only diagonal 'rows' with at least 4
    const relevantDiagonals = allDiagonals.filter((diag) => diag.length >= 4);
    return relevantDiagonals;
  };

  const createDiagonalsBottomToTop = (): Cell[][] => {
    const allDiagonals = [];
    // push all diagonals from first column
    for (const column of board[0]) {
      allDiagonals.push(createBottomToTopDiagonalArrayFromIndex(column));
    }
    // push all diagonals from last row except first col
    for (const column of board.slice(1)) {
      const lastRowIndex = column.length - 1;
      let relevantCell = column[lastRowIndex];
      allDiagonals.push(createBottomToTopDiagonalArrayFromIndex(relevantCell));
    }
    //filter only diagonal 'rows' with at least 4
    const relevantDiagonals = allDiagonals.filter((diag) => diag.length >= 4);
    return relevantDiagonals;
  };

  const checkDiagonalLBtoTR = () => {
    let diagonals = createDiagonalsBottomToTop();
    return diagonals.some((d) => checkForFour(d));
  };
  const checkDiagonalRBtoTL = () => {
    let diagonals = createDiagonalsTopToBottom();
    return diagonals.some((d) => checkForFour(d));
  };

  const checkForFourInRow = () => {
    // arrange in order of complexity- to get best performance
    return (
      checkVerticalSpaces() ||
      checkHorizontalSpaces() ||
      checkDiagonalLBtoTR() ||
      checkDiagonalRBtoTL()
    );
  };
  const getBoard = () => board;
  return {
    getBoard,
    placePiece,
    checkForFourInRow,
  };
};

export default CreateBoard;
