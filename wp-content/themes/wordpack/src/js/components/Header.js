
export default class Header extends Resizable {
  constructor() {
    super();

    this._template = {
      $header : $(".wordpack-header")
    };

    this.addHeaderListeners();
  }

  addHeaderListeners = () => {
    // ...
  }
}

new Header();
