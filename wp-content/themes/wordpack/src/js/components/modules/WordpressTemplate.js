import Resizable from "./Resizable";

export default class WordpressTemplate extends Resizable {
  constructor() {
    super();

    Object.assign(this.state, {
      $html : $("html"),
      htmlBackgroundColor: "white"
    });

    this.wordpressTemplateProxy = new Proxy(this.state, {
      set(target, key, value) {
        target[key] = value;

        switch(key) {
          case "htmlBackgroundColor":
            $html.addClass(`bg-${value}`);
            break;

          default:
            break;
        }

        return true;
      }
    });

    this.defaultResizeHandler();
    this.addDefaultResizeHandler();
  }
}
