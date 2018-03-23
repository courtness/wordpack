require("../scss/index.scss");

import jQuery from "jquery";

(global => {
  window.$ = jQuery;
  window.baseURL = document.getElementById("wp-base-url").href;

  $(document).ready(function() {
    $("#wp-base-url").remove();
    $("[data-component]").each((i, elem) => {
      require("./components/" + $(elem).data("component"));
    });
  });
})(window);
