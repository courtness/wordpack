import { query } from "@/src/js/utils/dom.js";

export default class Home {
  constructor() {
    this._template = {
      root : query(`#template-root`)
    };

    this.initialize();
  }

  initialize = () => {
    console.log(`Home`);
  }
}

new Home();
