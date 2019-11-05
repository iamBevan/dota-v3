import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { winRate } from './utils/functions';

test("handles winrate correctly", () => {
    const wins = 99;
    const losses = 99;
    const winrate = winRate(wins, losses);

    expect(winrate).toEqual(50);
})

test("handles images correctly", () => {
    expect(2).toBe(2);
});

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});
