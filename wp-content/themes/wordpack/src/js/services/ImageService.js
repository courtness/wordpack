import { eventService } from "@/src/js/services/EventService";
import { addClass, query } from "@/src/js/utils/dom";
import { isIterable } from "@/src/js/utils/dom";
import { isDesktop } from "@/src/js/utils/screen";

class ImageService {
  constructor() {
    this._preloadedImages = [];

    this._template = {
      defaultLoadable : query(`.img-defer`),
      carouselLoadable : query(`.img-defer--carousel`),
      desktopLoadable : query(`.img-defer--desktop`),
      scrollLoadable : query(`.img-defer--scroll`),
      touchLoadable : query(`.img-defer--touch`)
    }

    this._carouselLoaded = false;
    this._defaultLoaded = false;
    this._desktopLoaded = false;
    this._scrollLoaded = false;
    this._touchLoaded = false;
  }

  load = () => {
    this.addScrollListener();
    this.loadDefaultContent();
    this.loadDeviceContent();

    setTimeout(() => {
      this.loadDeferredScrollContent();
    }, 1000);
  }

  addResizeListener = () => {
    eventService.on(`device`, () => {
      this.loadDeviceContent();
    });
  }

  addScrollListener = () => {
    eventService.on(`scroll`, scrollData => {
      if (scrollData.scrollTop > 200) {
        this.loadDeferredScrollContent();
      }
    });
  }

  //

  loadDefaultContent = () => {
    if (this._defaultLoaded || !this._template.defaultLoadable || !this._template.defaultLoadable.length) {
      return;
    }

    this._defaultLoaded = true;

    this.lazyLoad(this._template.defaultLoadable, 100);
  }

  loadDeferredCarouselContent = () => {
    if (this._carouselLoaded || !this._template.carouselLoadable || !this._template.carouselLoadable.length) {
      return;
    }

    this._carouselLoaded = true;

    this.lazyLoad(this._template.carouselLoadable, 100);
  }

  loadDeferredDesktopContent = () => {
    if (this._desktopLoaded || !this._template.desktopLoadable || !this._template.desktopLoadable.length) {
      return;
    }

    this._desktopLoaded = true;

    this.lazyLoad(this._template.desktopLoadable, 100);
  }

  loadDeferredScrollContent = () => {
    if (this._scrollLoaded || !this._template.scrollLoadable || !this._template.scrollLoadable.length) {
      return;
    }

    this._scrollLoaded = true;

    this.lazyLoad(this._template.scrollLoadable, 100);
  }

  loadDeferredTouchContent = () => {
    if (this._touchLoaded || !this._template.touchLoadable || !this._template.touchLoadable.length) {
      return;
    }

    this._touchLoaded = true;

    this.lazyLoad(this._template.touchLoadable, 100);
  }

  loadDeviceContent = () => {
    if (isDesktop()) {
      this.loadDeferredDesktopContent();
    } else {
      this.loadDeferredTouchContent();
    }
  }

  //


  lazyLoad = (imageElements, timeout) => {
    if (!imageElements) {
      return;
    }

    if (!isIterable(imageElements)) {
      imageElements = [ imageElements ];
    }

    if (!timeout) {
      timeout = 100;
    }

    let count = 0;

    imageElements.forEach((element) => {
      if (!element.hasAttribute(`data-src`)) {
        return;
      }

      count++;

      setTimeout(() => {
        element.setAttribute(`src`, element.getAttribute(`data-src`));

        element.onload = () => {
          addClass(element, `img-loaded`);
          element.removeAttribute(`data-src`);
        };
      }, count * timeout);
    });
  }
}

export let imageService = new ImageService();
