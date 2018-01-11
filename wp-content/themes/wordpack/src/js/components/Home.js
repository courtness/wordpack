import WordpressTemplate from "./modules/WordpressTemplate";

export default class Home extends WordpressTemplate {
  constructor() {
    super();

    console.log(this.state);

    window.addEventListener("resize", this.debugState, true);
  }

  debugState = () => {
    console.log(this.state);
  }
}

var home = new Home();
