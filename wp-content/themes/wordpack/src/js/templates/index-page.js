import WordpressTemplate from "~/src/js/modules/WordpressTemplate";
import { query } from "~/src/js/utils/dom.js";

export default class Home extends WordpressTemplate {
  state = {
    active: false
  };

  template = {
    root: query(`#template-root`)
  }

  constructor() {
    super();

    this.mount();
  }

  mount = () => {
    console.log(`Mounted`);
  }
}

new Home();
