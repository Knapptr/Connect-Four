import { Adder, Remover, Trigger, Events } from "./types";
export const EventsManager = () => {
  const events: Events = {};

  const add: Adder = (eventName, callback) => {
    if (!events[eventName]) {
      events[eventName] = [];
    }
    events[eventName].push(callback);
  };

  const remove: Remover = (eventName, callback) => {
    if (events[eventName]) {
      events[eventName] = events[eventName].filter((cb) => cb !== callback);
    }
  };
  const trigger: Trigger = (data) => {
    if (events[data.action]) {
      events[data.action].forEach((fn) => {
        fn(data.payload);
      });
    }
  };
  return {
    add,
    remove,
    trigger,
  };
};

export default EventsManager;
