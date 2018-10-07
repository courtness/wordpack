import { eventService } from "@/src/js/services/EventService";
import { getDevice, getWindowWidth } from "@/src/js/utils/screen";

export default class DocumentService {
  constructor() {

    this.state = {
      device: getDevice(),
      scrolling: false,
      scrollingDown: false,
      scrollTop: 0,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight
    };

    this._scrollTimeout = {};
  }

  //

  addWindowResizeListener = () => {
    window.removeEventListener(`resize`, this.windowResizeHandler, false);
    window.addEventListener(`resize`, this.windowResizeHandler, false);
  }

  windowResizeHandler = (e) => {
    this.state.windowWidth = getWindowWidth();
    this.state.windowHeight = document.documentElement.clientHeight;

    let oldDevice = this.state.device;

    this.state.device = getDevice();

    if (oldDevice !== this.state.device) {
      eventService.emitDataByKey(`device`, this.state.device);
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

  documentScrollHandler = (e) => {
    clearTimeout(this._scrollTimeout);

    this.state.scrolling = true;
    this.state.scrollingDown = this.state.scrollTop < document.documentElement.scrollTop;
    this.state.scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop +
        (document.documentElement && document.documentElement.scrollTop || 0);

    eventService.emitDataByKey(`scroll`, {
      scrollTop: this.state.scrollTop,
      scrollingDown: this.state.scrollingDown
    });

    this._scrollTimeout = setTimeout(() => {
      this.state.scrolling = false;
      eventService.emitDataByKey(`scrollend`, this.state.scrollTop);
    }, 100);
  }
}

export let documentService = new DocumentService();
