import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders header", () => {
  render(<App />);
  const header = screen.getByText("(de)Connect Four");
  expect(header).toBeInTheDocument();
});

test("renders players", () => {
  render(<App />);
  const playerNames = screen.getByText(/players/i);
  expect(playerNames).toBeInTheDocument();
});
