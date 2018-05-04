import Resizable from "./Resizable";
import { eventService } from "./../../services/EventService";

export default class WordpressTemplate extends Resizable {
  constructor() {
    super();

    Object.assign(this.state, {
      bodyToggleClass : "",
      htmlToggleClass : "",
      scrollAtBottom : false,
      scrollAtTop : false,
      scrollNearBottom : false,
      scrollNearTop : false,
      scrollTop : 0,
      scrollTimeout : {},

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

    self.addDefaultScrollListener();
  }

  addDefaultScrollListener = () => {
    $(window).on("scroll", (event) => {
      if (this.state.scrollTimeout) {
        clearTimeout(this.state.scrollTimeout);
      }

      this.state.scrollTimeout = setTimeout(() => {
        eventService.emitDataByKey("scrollend", this.state.scrollTop);
      }, 100);

      this.state.scrollTop = $(event.currentTarget).scrollTop();

      eventService.emitDataByKey("scroll", this.state.scrollTop);

      let atTop = this.state.scrollAtTop;
      if (this.state.scrollTop === 0) {
        this.state.scrollAtTop = true;

        if (!atTop) {
          eventService.emitDataByKey("scrollAtTop", this.state.scrollTop);
        }
      } else {
        this.state.scrollAtTop = false;
      }

      let nearTop = this.state.scrollNearTop;
      if (this.state.scrollTop < 300) {
        this.state.scrollNearTop = true;

        if (!nearTop) {
          eventService.emitDataByKey("scrollNearTop", this.state.scrollTop);
        }
      } else {
        this.state.scrollNearTop = false;
      }

      let nearBottom = this.state.scrollNearBottom;
      if (this.state.scrollTop > (($(document).height() - this.state.windowHeight) - 300)) {
        this.state.scrollNearBottom = true;

        if (!nearBottom) {
          eventService.emitDataByKey("scrollNearBottom", this.state.scrollTop);
        }
      } else {
        this.state.scrollNearBottom = false;
      }

      let atBottom = this.state.scrollAtBottom;
      if (this.state.scrollTop === ($(document).height() - this.state.windowHeight)) {
        this.state.scrollAtBottom = true;

        if (!atBottom) {
          eventService.emitDataByKey("scrollAtBottom", this.state.scrollTop);
        }
      } else {
        this.state.scrollAtBottom = false;
      }
    });

    setTimeout(() => {
      $(window).trigger("scroll");
    }, 1);
  }
}
