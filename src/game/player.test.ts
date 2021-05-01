import CreatePlayer from "./player";

describe("create player", () => {
  let greggaro = CreatePlayer({
    name: "Greggaro",
    id: "player_1",
    color: "red",
    isAI: false,
  });
  test("create a player with a name and assign an id", () => {
    expect(greggaro.getName()).toEqual("Greggaro");
    expect(greggaro.id).toBe("player_1");
    expect(greggaro.getColor()).toBe("red");
  });
  test("change players name", () => {
    greggaro.setName("Cool Baby DunksAlot");
    expect(greggaro.getName()).toBe("Cool Baby DunksAlot");
  });
  test("change players name to empty string", () => {
    greggaro.setName("");
    expect(greggaro.getName()).toBe("anonymous");
  });
  test("change players color", () => {
    greggaro.setColor("black");
    expect(greggaro.getColor()).toBe("black");
  });
  test("returns if player is ai", () => {
    expect(greggaro.isAI).toEqual(false);
  });
});
