import CreateBoard from "./board";
describe("Board creation", () => {
  test("returns a board of correct size", () => {
    let board = CreateBoard(4, 4);
    expect(board.getBoard().length).toEqual(4);
    expect(board.getBoard()[0].length).toEqual(4);
  });

  test("creates correct board", () => {
    let board = CreateBoard(4, 4);
    let expectedBoard = [
      [
        { coords: { x: 0, y: 0 }, occupied: false },
        { coords: { x: 0, y: 1 }, occupied: false },
        { coords: { x: 0, y: 2 }, occupied: false },
        { coords: { x: 0, y: 3 }, occupied: false },
      ],
      [
        { coords: { x: 1, y: 0 }, occupied: false },
        { coords: { x: 1, y: 1 }, occupied: false },
        { coords: { x: 1, y: 2 }, occupied: false },
        { coords: { x: 1, y: 3 }, occupied: false },
      ],
      [
        { coords: { x: 2, y: 0 }, occupied: false },
        { coords: { x: 2, y: 1 }, occupied: false },
        { coords: { x: 2, y: 2 }, occupied: false },
        { coords: { x: 2, y: 3 }, occupied: false },
      ],
      [
        { coords: { x: 3, y: 0 }, occupied: false },
        { coords: { x: 3, y: 1 }, occupied: false },
        { coords: { x: 3, y: 2 }, occupied: false },
        { coords: { x: 3, y: 3 }, occupied: false },
      ],
    ];
    expect(board.getBoard()).toEqual(expectedBoard);
  });
  test("shouldn't allow values below 4", () => {
    expect(() => CreateBoard(1, 2)).toThrow();
    expect(() => CreateBoard(2, 1)).toThrow();
  });
});

describe("boardPlacement", () => {
  test("places player 1 in col 1", () => {
    let board = CreateBoard(4, 4);
    let expectedBoard = [
      [
        { coords: { x: 0, y: 0 }, occupied: false },
        { coords: { x: 0, y: 1 }, occupied: false },
        { coords: { x: 0, y: 2 }, occupied: false },
        { coords: { x: 0, y: 3 }, occupied: "player_1" },
      ],
      [
        { coords: { x: 1, y: 0 }, occupied: false },
        { coords: { x: 1, y: 1 }, occupied: false },
        { coords: { x: 1, y: 2 }, occupied: false },
        { coords: { x: 1, y: 3 }, occupied: false },
      ],
      [
        { coords: { x: 2, y: 0 }, occupied: false },
        { coords: { x: 2, y: 1 }, occupied: false },
        { coords: { x: 2, y: 2 }, occupied: false },
        { coords: { x: 2, y: 3 }, occupied: false },
      ],
      [
        { coords: { x: 3, y: 0 }, occupied: false },
        { coords: { x: 3, y: 1 }, occupied: false },
        { coords: { x: 3, y: 2 }, occupied: false },
        { coords: { x: 3, y: 3 }, occupied: false },
      ],
    ];
    board.placePiece(0, "player_1");
    expect(board.getBoard()).toEqual(expectedBoard);
  });

  test("stacks pieces in same col", () => {
    let board = CreateBoard(4, 4);
    let expectedBoard = [
      [
        { coords: { x: 0, y: 0 }, occupied: false },
        { coords: { x: 0, y: 1 }, occupied: false },
        { coords: { x: 0, y: 2 }, occupied: false },
        { coords: { x: 0, y: 3 }, occupied: false },
      ],
      [
        { coords: { x: 1, y: 0 }, occupied: false },
        { coords: { x: 1, y: 1 }, occupied: false },
        { coords: { x: 1, y: 2 }, occupied: "player_2" },
        { coords: { x: 1, y: 3 }, occupied: "player_1" },
      ],
      [
        { coords: { x: 2, y: 0 }, occupied: false },
        { coords: { x: 2, y: 1 }, occupied: false },
        { coords: { x: 2, y: 2 }, occupied: false },
        { coords: { x: 2, y: 3 }, occupied: false },
      ],
      [
        { coords: { x: 3, y: 0 }, occupied: false },
        { coords: { x: 3, y: 1 }, occupied: false },
        { coords: { x: 3, y: 2 }, occupied: false },
        { coords: { x: 3, y: 3 }, occupied: false },
      ],
    ];
    board.placePiece(1, "player_1");
    board.placePiece(1, "player_2");
    expect(board.getBoard()).toEqual(expectedBoard);
  });

  test("won't allow player to place in filled col", () => {
    let board = CreateBoard(4, 4);
    board.placePiece(0, "player_1");
    board.placePiece(0, "player_2");
    board.placePiece(0, "player_2");
    board.placePiece(0, "player_2");
    expect(() => board.placePiece(0, "player_1")).toThrow();
  });
});

describe("check if 4 in a row", () => {
  test("check vertical 4", () => {
    let board = CreateBoard(4, 4);
    board.placePiece(0, "player_1");
    board.placePiece(0, "player_1");
    board.placePiece(0, "player_1");
    board.placePiece(0, "player_1");
    expect(board.checkForFourInRow()).toEqual(true);
  });
  test("check horizontal 4", () => {
    let board = CreateBoard(4, 4);
    board.placePiece(0, "player_1");
    board.placePiece(1, "player_1");
    board.placePiece(2, "player_1");
    board.placePiece(3, "player_1");
    expect(board.checkForFourInRow()).toEqual(true);
  });
  test("check diagonal 4: /", () => {
    let board = CreateBoard(4, 4);
    board.placePiece(0, "player_1");
    board.placePiece(1, "player_2");
    board.placePiece(1, "player_1");
    board.placePiece(2, "player_2");
    board.placePiece(2, "player_2");
    board.placePiece(2, "player_1");
    board.placePiece(3, "player_2");
    board.placePiece(3, "player_2");
    board.placePiece(3, "player_2");
    board.placePiece(3, "player_1");
    expect(board.checkForFourInRow()).toEqual(true);
  });
  test("check diagonal 4: \\", () => {
    let board = CreateBoard(4, 4);
    board.placePiece(0, "player_1");
    board.placePiece(0, "player_1");
    board.placePiece(0, "player_1");
    board.placePiece(0, "player_2");
    board.placePiece(1, "player_1");
    board.placePiece(1, "player_1");
    board.placePiece(1, "player_2");
    board.placePiece(2, "player_1");
    board.placePiece(2, "player_2");
    board.placePiece(3, "player_2");
    expect(board.checkForFourInRow()).toEqual(true);
  });
});
