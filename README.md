# (de) Connect Four

## About

This is really just a proof of concept. The goal was to decouple 'game' logic as much as possible from UI logic in react.
I also started learning/using Typescript! Exciting!

## Goals

- remove ALL **non UI** logic from React components
- utilize [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern)
- learn [typescript!](https://www.typescriptlang.org/)
- implement better TDD practices with [jest](https://jestjs.io/) 
- create a 'game' that could be implemented using different front-end frameworks,a CLI, or anything with a js runtime!


## Strategy

Game updates and logic happen in `connectFour`. `events` handles changes inside the `connectFour` instance. Using the observer pattern, react components update their state when `connectFour` fires 'event.trigger()`


