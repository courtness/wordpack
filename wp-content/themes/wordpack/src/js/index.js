import jQuery from "jquery";
import { isEmpty } from "./utils/helpers";

require("../scss/index.scss");

(global => {
  window.$ = jQuery;

  $(document).ready(function() {
    $("[data-component]").each((i, elem) => {
      require("./components/" + $(elem).data("component"));
    });
  });
})(window);
