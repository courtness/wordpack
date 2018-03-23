
class ImageService {
  constructor() {
    this._template = {
      $imgCache : {}
    }
  }

  getImageCache = () => {
    return this._template.$imgCache;
  }

  setImageCache = ($imgElements) => {
    this._template.$imgCache = $imgElements;
  }

  lazyLoad = ($imgElements, timeout, save) => {
    if (!$imgElements.length) {
      return;
    }

    if (!timeout) {
      timeout = 100;
    }

    if (save) {
      this._template.$imgCache = $imgElements;
    }

    $imgElements.each((index, element) => {
      setTimeout(() => {
        $(element).attr("src", $(element).data("src"));

        $(element)[0].onload = () => {
          $(element)[0].removeAttribute("data-src");
        };
      }, index * timeout);
    });
  }
}

export let imageService = new ImageService();
