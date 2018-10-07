import { wordpressAdminService } from "@/src/js/services/WordpressAdminService";

(global => {
  window.baseURL = document.getElementById(`wp-url`).getAttribute(`data-baseurl`);

  wordpressAdminService.initialize();

  document.addEventListener(`DOMContentLoaded`, () => {
    document.querySelectorAll(`[data-component]`).forEach((element) => {
      import(/* webpackChunkName: "chunk-[request]" */ `./components/${element.getAttribute(`data-component`)}`);
    });
  });
})(window);
