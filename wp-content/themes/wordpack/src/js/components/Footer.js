import Resizable from "./modules/Resizable";

let FOOTER;

export default class Footer extends Resizable {
  constructor() {
    super();

    FOOTER = this;

    FOOTER._template = {
      $footer : $(".footer")
    };

    FOOTER.initialize();
  }

  initialize = () => {
    // ...
  }
}

new Footer();
