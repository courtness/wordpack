
export default class Footer extends Resizable {
  constructor() {
    super();

    this._template = {
      $footer : $(".wordpack-footer")
    };

    this.addFooterListeners();
  }

  addFooterListeners = () => {
    // ...
  }
}

new Footer();
