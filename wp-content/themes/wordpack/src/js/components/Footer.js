import Resizable from "./modules/Resizable";

export default class Footer extends Resizable {
  constructor() {
    super();

    console.log("Footer.state: ", this.state);

    window.addEventListener("resize", this.debugState, true);
  }

  debugState = () => {
    console.log("Footer.state: ", this.state);
  }
}

new Footer();
