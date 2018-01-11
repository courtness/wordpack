
export default class Resizable {
  constructor() {
    this.state = {
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
    };
  }

  onResize = () => {
    this.state.windowWidth = document.documentElement.clientWidth
    this.state.windowHeight = document.documentElement.clientHeight
  }

  registerResizeHandler = () => {
    window.addEventListener("resize", this.onResize, true);
  }

  unregisterResizeHandler = () => {
    window.removeEventListener("resize", this.onResize, true);
  }
}
