import EventsManager from "./events";

const mockCallback = jest.fn();
const mockCallback2 = jest.fn();

test("subscribe to event,and fire it", () => {
  let events = EventsManager();
  events.add("testEvent", mockCallback);
  events.trigger({ action: "testEvent" });
  expect(mockCallback).toHaveBeenCalled();
});

test("remove an event", () => {
  let events = EventsManager();
  events.add("testEvent", mockCallback);
  events.remove("testEvent", mockCallback);
  events.trigger({ action: "testEvent" });
  expect(mockCallback).toHaveBeenCalledTimes(0);
});
test("doesn't remove different callback of an event", () => {
  let events = EventsManager();
  events.add("testEvent", mockCallback);
  events.add("testEvent", mockCallback2);
  events.remove("testEvent", mockCallback);
  events.trigger({ action: "testEvent" });
  expect(mockCallback).toHaveBeenCalledTimes(0);
  expect(mockCallback2).toHaveBeenCalled();
});

test("callback called with data", () => {
  const events = EventsManager();
  events.add("testEvent", mockCallback);
  events.trigger({
    action: "testEvent",
    payload: { name: "test event was called" },
  });
  expect(mockCallback).toHaveBeenCalledWith({ name: "test event was called" });
});
