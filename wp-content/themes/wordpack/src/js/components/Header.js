import Resizable from "./modules/Resizable";

let HEADER;

export default class Header extends Resizable {
  constructor() {
    super();

    HEADER = this;

    HEADER._template = {
      $header : $(".wordpack-header")
    };

    HEADER.initialize();
  }

  initialize = () => {
    // ...
  }
}

new Header();
