import { themeService } from "@/src/js/services/ThemeService";
import { wordpressAdminService } from "@/src/js/services/WordpressAdminService";

(() => {
  window.baseURL = document.getElementById(`wp-url`).getAttribute(`data-baseurl`);

  wordpressAdminService.initialize();
  
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
  });
})(window);
