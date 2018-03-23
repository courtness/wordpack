import Resizable from "./Resizable";

export default class WordpressTemplate extends Resizable {
  constructor() {
    super();

    Object.assign(this.state, {
      bodyToggleClass : "",
      htmlToggleClass : "",
      windowWidth  : this.state.windowWidth,
      windowHeight : this.state.windowHeight,

      template : {
        $body : $("body"),
        $html : $("html")
      }
    });

    this.initialise();
  }

  initialise = () => {
    let self = this;

    self.wordpressTemplateProxy = new Proxy(self.state, {
      set(target, key, value) {
        target[key] = value;

        switch(key) {
          case "htmlToggleClass":
            self.state.template.$html.toggleClass(value);
            break;

          case "bodyToggleClass":
            self.state.template.$body.toggleClass(value);
            break;

          default:
            break;
        }

        return true;
      }
    });
  }
}
