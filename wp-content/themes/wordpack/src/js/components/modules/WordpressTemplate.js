import Resizable from "./Resizable";

export default class WordpressTemplate extends Resizable {
  constructor() {
    super();

    this.state = {
      templateClasses: $("#template-root").attr("class")
    }

    this.registerResizeHandler();
  }
}
