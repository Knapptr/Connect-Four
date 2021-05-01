import { PlayerInit } from "./types";

const CreatePlayer = (player: PlayerInit) => {
  let name = player.name;
  const id = player.id;
  const isAI = player.isAI;
  let color = player.color;

  const getName = () => {
    return name;
  };
  const setName = (newName: string) => {
    let trimmedName = newName.trim();
    if (trimmedName.length <= 0) {
      trimmedName = "anonymous";
    }
    name = trimmedName;
    return name;
  };
  const getColor = () => {
    return color;
  };
  const setColor = (newColor: "red" | "black") => {
    color = newColor;
    return color;
  };

  return {
    getName,
    setName,
    getColor,
    setColor,
    id,
    isAI,
  };
};
export default CreatePlayer;
