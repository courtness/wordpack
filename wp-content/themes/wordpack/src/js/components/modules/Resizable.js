import { eventService } from "./../../services/EventService";
import { isMobile, isTablet, isDesktop } from "./../../utils/screen";

export default class Resizable {
  constructor() {
    this.state = {
      device: "desktop",
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight
    };
  }

  defaultResizeHandler = () => {
    this.state.windowWidth = document.documentElement.clientWidth;
    this.state.windowHeight = document.documentElement.clientHeight;

    let oldDevice = this.state.device;

    if (isMobile()) {
      this.state.device = "mobile";
    } else if (isTablet()) {
      this.state.device = "tablet";
    } else {
      this.state.device = "desktop";
    }

    if (oldDevice !== this.state.device) {
      eventService.emitDeviceChange(this.state.device);
    }
  }

  addDefaultResizeHandler = () => {
    window.addEventListener("resize", this.defaultResizeHandler, true);
  }

  removeDefaultResizeHandler = () => {
    window.removeEventListener("resize", this.defaultResizeHandler, true);
  }
}
