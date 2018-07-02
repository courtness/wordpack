import { eventService } from "./../../services/EventService";
import { isMobile, isTablet, isDesktop } from "./../../utils/screen";

let RESIZABLE;

export default class Resizable {
  constructor() {
    RESIZABLE = this;

    RESIZABLE.state = {
      device: "desktop",
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight
    };

    RESIZABLE.updateDevice();

    RESIZABLE.addDefaultResizeHandler();
  }

  defaultResizeHandler = () => {
    RESIZABLE.state.windowWidth = document.documentElement.clientWidth;
    RESIZABLE.state.windowHeight = document.documentElement.clientHeight;

    let oldDevice = RESIZABLE.state.device;

    RESIZABLE.updateDevice();

    if (oldDevice !== RESIZABLE.state.device) {
      eventService.emitDataByKey("device", RESIZABLE.state.device);
    }

    eventService.emitDataByKey("resize", {
      width: RESIZABLE.state.windowWidth,
      height: RESIZABLE.state.windowHeight
    });
  }

  addDefaultResizeHandler = () => {
    window.addEventListener("resize", RESIZABLE.defaultResizeHandler, true);
  }

  removeDefaultResizeHandler = () => {
    window.removeEventListener("resize", RESIZABLE.defaultResizeHandler, true);
  }

  updateDevice = () => {
    if (isMobile()) {
      RESIZABLE.state.device = "mobile";
    } else if (isTablet()) {
      RESIZABLE.state.device = "tablet";
    } else {
      RESIZABLE.state.device = "desktop";
    }
  }
}
