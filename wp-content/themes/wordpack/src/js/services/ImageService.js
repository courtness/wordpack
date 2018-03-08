import { isDefined } from "./../utils/helpers";

class ImageService {
  constructor() {
    this.state = {
      loaded : false,
      $imageCache : {}
    }
  }

  isLoaded = () => {
    return this.state.loaded;
  }

  getImageCache = () => {
    return this.state.$imageCache;
  }

  setImageCache = ($images) => {
    this.state.$imageCache = $images;
  }

  lazyLoadImageCache = (timeout) => {
    lazyLoad(this.state.$imageCache, timeout);
  }

  lazyLoad = ($imgElements, timeout) => {
    if (!$imgElements.length) {
      return;
    }

    if (!isDefined(timeout)) {
      timeout = 100;
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
