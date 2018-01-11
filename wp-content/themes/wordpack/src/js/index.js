import jQuery from "jquery";
import { isEmpty } from "./utils/helpers";

require("../scss/index.scss");

(global => {
  window.$ = jQuery;

  $(document).ready(function() {
    require("./components/Header");
    require("./components/Footer");

    if ($("#template-root").length && !isEmpty($("#template-root").data("component"))) {
      require("./components/" + $("#template-root").data("component"));
    }
  });
})(window);
