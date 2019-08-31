import EventEmitter from "events";

class EventService extends EventEmitter {
  constructor() {
    super();
  }

  //

  emitDataByKey = (key, data) => {
    this.emit(key, data);
  }
}

export let eventService = new EventService();
