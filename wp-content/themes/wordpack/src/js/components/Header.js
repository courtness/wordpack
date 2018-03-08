
export default class Header extends Resizable {
  constructor() {
    super();

    Object.assign(this.state, {
      $header : $(".wordpack-header"),
    });

    this.addHeaderListeners();
  }

  addHeaderListeners = () => {
    // ...
  }
}

new Header();
