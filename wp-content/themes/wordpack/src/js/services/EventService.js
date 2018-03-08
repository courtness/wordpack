import EventEmitter from "events";

class EventService extends EventEmitter {
  constructor() {
    super();
  }

  emitDeviceChange = (device) => {
    this.emit("device", device);
  }

  // emitSomeAjaxEvent ...

  // emitLocationFound ...

  // emitCookieLoaded ...
}

export let eventService = new EventService();
