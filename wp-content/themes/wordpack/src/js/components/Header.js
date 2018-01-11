import Resizable from "./modules/Resizable";

export default class Header extends Resizable {
  constructor() {
    super();

    console.log("Header.state: ", this.state);

    window.addEventListener("resize", this.debugState, true);
  }

  debugState = () => {
    console.log("Header.state: ", this.state);
  }
}

new Header();
