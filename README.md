# (de) Connect Four

## About

This is really just a proof of concept. The goal was to decouple 'game' logic as much as possible from UI logic in react.

## Goals

- remove ALL non UI logic from React components
- utilize observer pattern
- learn typescript!
- implement better TDD!

## Strategy

Game updates and logic happen in `connectFour`. `events` handles changes inside the `connectFour` instance. Using the observer pattern, react components update their state when `connectFour` fires 'event.trigger()`
