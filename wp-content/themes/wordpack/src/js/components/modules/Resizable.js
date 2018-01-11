
export default class Resizable {
  constructor() {
    this.state = {
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
    };
  }

  doSomethingResizable = () => {
    console.log("doing a resize thing");
  }

  onResize = () => {
    this.state.windowWidth = document.documentElement.clientWidth
    this.state.windowHeight = document.documentElement.clientHeight
    console.log(`height: ${this.state.windowHeight}, width: ${this.state.windowWidth}`);
  }

  registerResizeHandler = () => {
    window.addEventListener("resize", this.onResize, true);
  }

  unregisterResizeHandler = () => {
    window.removeEventListener("resize", this.onResize, true);
  }
}
