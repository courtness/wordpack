import { queryByAttribute } from "@/src/js/utils/dom.js";

class ImageService {
  lazyLoad = (imageElements, timeout) => {
    if (!imageElements) {
      return;
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
          element.removeAttribute(`data-src`);
        };
      }, count * timeout);
    });
  }
}

export let imageService = new ImageService();
