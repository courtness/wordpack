import WordpressTemplate from "./modules/WordpressTemplate";

export default class Home extends WordpressTemplate {
  constructor() {
    super();

    console.log("Home.state: ", this.state);

    window.addEventListener("resize", this.debugState, true);
  }

  debugState = () => {
    console.log("Home.state: ", this.state);
  }
}

new Home();
