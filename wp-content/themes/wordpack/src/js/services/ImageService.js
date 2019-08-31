import { eventService } from "~/src/js/services/EventService";
import { addClass, query } from "~/src/js/utils/dom";
import { isIterable } from "~/src/js/utils/dom";
import { isDesktop } from "~/src/js/utils/screen";

class ImageService {
  state = {
    preloadedImages : [],
    carouselLoaded : false,
    defaultLoaded : false,
    desktopLoaded : false,
    scrollLoaded : false,
    touchLoaded : false
  }

  template = {
    defaultLoadable : query(`.img-defer`),
    carouselLoadable : query(`.img-defer--carousel`),
    desktopLoadable : query(`.img-defer--desktop`),
    scrollLoadable : query(`.img-defer--scroll`),
    touchLoadable : query(`.img-defer--touch`)
  }

  mount = () => {
    this.addScrollListener();
    this.loadDefaultContent();
    this.loadDeviceContent();

    setTimeout(() => {
      this.loadDeferredScrollContent();
    }, 1000);
  }

  //

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
    if (this.defaultLoaded || !this.template.defaultLoadable || !this.template.defaultLoadable.length) {
      return;
    }

    this.defaultLoaded = true;

    this.lazyLoad(this.template.defaultLoadable, 100);
  }

  loadDeferredCarouselContent = () => {
    if (this.carouselLoaded || !this.template.carouselLoadable || !this.template.carouselLoadable.length) {
      return;
    }

    this.carouselLoaded = true;

    this.lazyLoad(this.template.carouselLoadable, 100);
  }

  loadDeferredDesktopContent = () => {
    if (this.desktopLoaded || !this.template.desktopLoadable || !this.template.desktopLoadable.length) {
      return;
    }

    this.desktopLoaded = true;

    this.lazyLoad(this.template.desktopLoadable, 100);
  }

  loadDeferredScrollContent = () => {
    if (this.scrollLoaded || !this.template.scrollLoadable || !this.template.scrollLoadable.length) {
      return;
    }

    this.scrollLoaded = true;

    this.lazyLoad(this.template.scrollLoadable, 100);
  }

  loadDeferredTouchContent = () => {
    if (this.touchLoaded || !this.template.touchLoadable || !this.template.touchLoadable.length) {
      return;
    }

    this.touchLoaded = true;

    this.lazyLoad(this.template.touchLoadable, 100);
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
