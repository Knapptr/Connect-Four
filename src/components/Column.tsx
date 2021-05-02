import connectFour from "../game/app";
import { ColumnWrapper } from "./styles/wrappers";

const Column = (props: {
  index: number;
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <ColumnWrapper onClick={() => connectFour.takeTurn(props.index)}>
      {props.children}
    </ColumnWrapper>
  );
};

export default Column;
