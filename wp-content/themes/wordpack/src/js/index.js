//
// webpack requires

require("../scss/index.scss");

//
// app imports

import { isDefined } from "./utils/helpers";

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

    if ($("#template-id").length) {
      require("./components/" + $("#template-id").data("controller"));
    }
  });
})(jQuery);
