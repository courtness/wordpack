
export default class Resizable {
  constructor() {
    this.state = {
      windowWidth: $(window).width()
    };
  }

  doSomethingResizable = () => {
    console.log("doing a resize thing");
  }

  onResize = () => {
    this.state.windowWidth = $(window).width()
    console.log(this.state.windowWidth);
  }

  registerHandler = () => {
    window.onresize = this.onResize;
  }
}
