require("../scss/index.scss");

import jQuery from "jquery";

(global => {
  window.$ = jQuery;
  window.baseUrl = document.getElementById("wp-base-url");

  $(document).ready(function() {
    $("[data-component]").each((i, elem) => {
      require("./components/" + $(elem).data("component"));
    });
  });
})(window);
