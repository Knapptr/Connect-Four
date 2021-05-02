import styled from "styled-components";

interface Props {
  readonly occupied: boolean | string;
  readonly color: "red" | "black" | "white";
}
export const Cell = styled.div<Props>`
  background: ${({ color }) => color};
  height: 50px;
  width: 50px;
  border: 1px solid black;
`;
export const PlayerInfo = styled.li<{
  color: string;
  isCurrentPlayer: boolean;
  isWinner?: boolean;
}>`
  position: relative;
  background: ${({ color }) => color};
  text-align: center;
  color: whitesmoke;
  list-style: none;
  text-shadow: ${({ isCurrentPlayer }) =>
    isCurrentPlayer ? "0 0 5px white" : "none"};
  font-weight: bold;
  padding: 1rem;
  ::after {
    content: ${({ isCurrentPlayer, isWinner }) =>
      isWinner ? `"🏆"` : isCurrentPlayer ? `"👍"` : ""};
    position: absolute;
    padding-left: 15px;
  }
`;
