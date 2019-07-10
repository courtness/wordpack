import WordpressTemplate from "~/src/js/modules/WordpressTemplate";
import { query } from "~/src/js/utils/dom.js";
import { eventService } from "~/src/js/services/EventService";

export default class Home extends WordpressTemplate {
  constructor() {
    super();

    this._template = {
      root : query(`#template-root`)
    };

    this.initialize();
  }

  initialize = () => {
    this.addScrollListeners();
  }

  addScrollListeners = () => {
    eventService.on(`scroll`, (scrollData) => {
      // const scrollTop = scrollData.scrollTop;
    });
  }
}

new Home();
