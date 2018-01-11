import Resizable from "./Resizable";

export default class WordpressTemplate extends Resizable {
  constructor() {
    super();

    this.registerResizeHandler();

    this.doSomethingResizable();
  }

  doSomethingWordpress = () => {
    console.log("doing a wordpress thing");
  }
}
