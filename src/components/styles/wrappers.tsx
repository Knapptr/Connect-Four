import styled from "styled-components";

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  padding: 2rem;
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  h1 {
    flex-grow: 1;
    margin-left: 2rem;
  }
`;

export const PlayersWrapper = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const BoardWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  gap: 0.25rem;
`;

interface ColProps {
  onClick: (e: Event) => void;
}
export const ColumnWrapper = styled.div<ColProps>`
  display: flex;
  gap: inherit;
  flex-direction: column;
  :hover {
    filter: brightness(97%);
  }
`;
export const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 85%;
  max-width: 700px;
  margin: 0 auto;
  ul {
    margin: 0 auto;
    padding: 1rem;
    padding-inline-start: 0;
    min-width: 300px;
    max-width: 400px;
    li {
      margin-bottom: 0.5rem;
    }
  }
  h1 {
    text-align: center;
  }
`;
