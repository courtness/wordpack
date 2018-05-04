require("../scss/index.scss");

import jQuery from "jquery";

(global => {
  window.$ = jQuery;
  window.baseURL = $("#wp-url").data("baseurl");

  $(document).ready(function() {
    $("[data-component]").each((index, element) => {
      require("./components/" + $(element).data("component"));
    });
  });
})(window);
