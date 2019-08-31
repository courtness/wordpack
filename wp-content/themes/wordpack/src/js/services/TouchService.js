import { eventService } from "~/src/js/services/EventService";
import { isDesktop, getTouchEvent } from "~/src/js/utils/screen.js";

class TouchService {
  state = {
    xDown : false,
    yDown : false
  }
  
  //

  addTouchHandlersForElement = element => {
    element.addEventListener(`touchstart`, this.touchStartHandler, false);
    element.addEventListener(`touchmove`, this.touchMoveHandler, false);
  }

  touchStartHandler = e => {
    if (isDesktop()) {
      return;
    }

    this.state.xDown = getTouchEvent(e).clientX;
    this.state.yDown = getTouchEvent(e).clientY;
  }

  touchMoveHandler = e => {
    if (!this.state.xDown || !this.state.yDown || isDesktop()) {
      return;
    }

    let emitId = e.currentTarget.emitId;

    if (!emitId) {
      emitId = ``;
    }

    const xUp = e.touches[0].clientX;
    const yUp = e.touches[0].clientY;
    const xDiff = this.state.xDown - xUp;
    const yDiff = this.state.yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        eventService.emitDataByKey(`swipeLeft${emitId}`, e);
      } else {
        eventService.emitDataByKey(`swipeRight${emitId}`, e);
      }

    } else {
      if (yDiff > 0) {
        eventService.emitDataByKey(`swipeUp${emitId}`, e);
      } else {
        eventService.emitDataByKey(`swipeDown${emitId}`, e);
      }
    }

    this.state.xDown = null;
    this.state.yDown = null;
  };
}

export let touchService = new TouchService();
