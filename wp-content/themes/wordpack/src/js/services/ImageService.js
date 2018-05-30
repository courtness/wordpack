import { getDevice } from "../utils/screen";

class ImageService {
  lazyLoad = ($imgElements, timeout, save) => {
    if (!$imgElements) {
      $imgElements = $("img[data-src]");
    }

    if (!$imgElements.length) {
      return;
    }

    if (!timeout) {
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

  loadImagesForDevice = (timeout) => {
    let device = getDevice();
    let $imagesForDevice = $(`img[data-${device}src]`);

    if (!$imagesForDevice.length) {
      return;
    }

    if (!timeout) {
      timeout = 100;
    }

    $imagesForDevice.each((index, element) => {
      setTimeout(() => {
        $(element).attr("src", $(element).data(`${device}src`));

        $(element)[0].onload = () => {
          $(element)[0].removeAttribute(`${device}src`);
        };
      }, index * timeout);
    });
  }
}

export let imageService = new ImageService();
