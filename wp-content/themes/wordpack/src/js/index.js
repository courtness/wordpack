//
// webpack requires

require("../scss/index.scss");

//
// app imports

import { isDefined, isEmpty } from "./utils/helpers";

//
// executor

(function($) {
  "use strict";

  if (!isDefined($)) {
    console.error("Couldn't load jQuery from Wordpress");
    return;
  }

  window.$ = $;

  $(document).ready(function() {
    require("./components/Header");
    require("./components/Footer");

    // only ever one template-root at a time? 🐕
    if ($("#template-root").length && !isEmpty($("#template-root").data("controller")) {
      require("./components/" + $("#template-root").data("controller"));
    }
  });
})(jQuery);
