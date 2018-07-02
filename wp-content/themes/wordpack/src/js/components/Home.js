import WordpressTemplate from "./modules/WordpressTemplate";
import { eventService } from "./../services/EventService";
import { imageService } from "./../services/ImageService";
import { videoService } from "./../services/VideoService";
import { wordpressAdminService } from "./../services/WordpressAdminService";

let HOME;

export default class Home extends WordpressTemplate {
  constructor() {
    super();

    HOME = this;

    HOME.initialize();
  }

  initialize = () => {
    console.log("home");

    HOME.wordpressTemplateProxy.htmlToggleClass = "bg-black";

    eventService.on("device", (device) => {
      console.log("Device changed: ", device);

      switch (device) {
        case "desktop":
          console.log("doing desktop things");
          break;

        case "tablet":
          console.log("doing tablet things");
          break;

        case "mobile":
          console.log("doing mobile things");
          break;

        default:
          console.warn("uncaught device: ", device);
          break;
      }
    });
  }
}

new Home();
