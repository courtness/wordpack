import Resizable from "./Resizable";

export default class WordpressTemplate extends Resizable {
  constructor() {
    super();

    this.state = {
      htmlBackgroundColor: "white",
      templateClasses: $("#template-root").attr("class")
    }

    this.registerResizeHandler();
  }

  setHtmlBackgroundColor = (hex) => {
    this.state.htmlBackgroundColor = hex;
    $("html").css("background-color", hex);
  }
}
