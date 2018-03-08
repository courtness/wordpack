
export default class Footer extends Resizable {
  constructor() {
    super();

    Object.assign(this.state, {
      $footer : $(".wordpack-footer"),
    });

    this.addFooterListeners();
  }

  addFooterListeners = () => {
    // ...
  }
}

new Footer();
