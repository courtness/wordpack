import { eventService } from "~/src/js/services/EventService";
import { getDevice, getWindowWidth, isJumbo } from "~/src/js/utils/screen";

export default class DocumentService {
  state = {
    device: getDevice(),
    jumbo : false,
    scrolling: false,
    scrollingDown: false,
    scrollTop: 0,
    windowWidth: document.documentElement.clientWidth,
    windowHeight: document.documentElement.clientHeight
  };

  scrollTimeout = {};

  //

  addWindowResizeListener = () => {
    window.removeEventListener(`resize`, this.windowResizeHandler, false);
    window.addEventListener(`resize`, this.windowResizeHandler, false);
  }

  windowResizeHandler = () => {
    this.state.windowWidth = getWindowWidth();
    this.state.windowHeight = document.documentElement.clientHeight;

    let oldDevice = this.state.device;
    let oldJumbo = this.state.jumbo;

    this.state.device = getDevice();
    if (oldDevice !== this.state.device) {
      eventService.emitDataByKey(`device`, this.state.device);
    }

    this.state.jumbo = isJumbo();
    if (oldJumbo !== this.state.jumbo) {
      eventService.emitDataByKey(`jumbo`, this.state.jumbo);
    }

    eventService.emitDataByKey(`resize`, {
      windowWidth: this.state.windowWidth,
      windowHeight: this.state.windowHeight
    });
  }

  //

  addDocumentScrollListener = () => {
    document.removeEventListener(`scroll`, this.documentScrollHandler, false);
    document.addEventListener(`scroll`, this.documentScrollHandler, false);
  }

  documentScrollHandler = () => {
    clearTimeout(this.scrollTimeout);

    this.state.scrolling = true;
    this.state.scrollingDown = this.state.scrollTop < document.documentElement.scrollTop;
    this.state.scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop +
        (document.documentElement && document.documentElement.scrollTop || 0);

    eventService.emitDataByKey(`scroll`, {
      scrollTop: this.state.scrollTop,
      scrollingDown: this.state.scrollingDown
    });

    this.scrollTimeout = setTimeout(() => {
      this.state.scrolling = false;
      eventService.emitDataByKey(`scrollend`, this.state.scrollTop);
    }, 100);
  }
}

export let documentService = new DocumentService();
