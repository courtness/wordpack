import { isIterable } from "@/src/js/utils/dom";

class ImageService {
  constructor() {
    this._preloadedImages = [];
  }

  //

  preloadFromUrl = (url) => {
    let img = new Image();

    img.onload = () => {
      const index = this._preloadedImages.indexOf(this);

      if (index !== -1) {
        this._preloadedImages.splice(index, 1);
      }
    }

    this._preloadedImages.push(img);

    img.src = url;
  }

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
          element.removeAttribute(`data-src`);
        };
      }, count * timeout);
    });
  }
}

export let imageService = new ImageService();
