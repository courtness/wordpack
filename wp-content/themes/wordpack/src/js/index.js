import { themeService } from "@/src/js/services/ThemeService";
import { wordpressAdminService } from "@/src/js/services/WordpressAdminService";

(() => {
  window.baseURL = document.getElementById(`wp-url`).getAttribute(`data-baseurl`);

  wordpressAdminService.initialize();
  
  themeService.initialize();

  document.addEventListener(`DOMContentLoaded`, () => {
    document.querySelectorAll(`[data-component]`).forEach((element) => {
      import(/* webpackChunkName: "[request]" */ `./components/${element.getAttribute(`data-component`)}`);
    });
  });
})(window);
