import { query } from "@/src/js/utils/dom.js";

export default class Home {
  constructor() {
    this._template = {
      header : query(`header`)
    };

    this.initialize();
  }

  initialize = () => {
    console.log(`Header`);
  }
}

new Home();
