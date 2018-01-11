import WordpressTemplate from "./modules/WordpressTemplate";

export default class Home extends WordpressTemplate {
  constructor() {
    super();

    this.state = {
      windowWidth: $(window).width()
    };

    this.render();
    this.something();
  }

  onResize = () => {
    this.state.windowWidth = $(window).width()
    console.log(this.state.windowWidth);
  }

  render = () => {
    window.onresize = this.onResize;
  }
}

var home = new Home();
