import "core-js";
import "whatwg-fetch";

import { imageService } from "~/src/js/services/imageService";
import { themeService } from "~/src/js/services/ThemeService";
import { wordpressAdminService } from "~/src/js/services/WordpressAdminService";
import { ieDetector } from "~/src/js/utils/screen";

(() => {
  window.baseURL = document.getElementById(`wp-url`).getAttribute(`data-baseurl`);

  wordpressAdminService.initialize();

  imageService.load();
  themeService.initialize();

  const ie = ieDetector();

  if (ie && ie > 10) {
    document.addEventListener(`mousewheel`, event => {
      event.preventDefault();

      const wheelDelta = event.wheelDelta;
      const currentScrollPosition = window.pageYOffset;

      window.scrollTo(0, currentScrollPosition - wheelDelta);
    });
  }

  document.addEventListener(`DOMContentLoaded`, () => {
    document.querySelectorAll(`[data-component]`).forEach((element) => {
      import(/* webpackChunkName: "[request]" */ `./components/${element.getAttribute(`data-component`)}`);
    });
    document.querySelectorAll(`[data-template]`).forEach((element) => {
      import(/* webpackChunkName: "[request]" */ `./templates/${element.getAttribute(`data-template`)}-page`);
    });
  });
})(window);
