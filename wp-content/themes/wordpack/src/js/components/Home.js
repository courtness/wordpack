import WordpressTemplate from "./modules/WordpressTemplate";
import { eventService } from "./../services/EventService";
import { imageService } from "./../services/ImageService";
import { videoService } from "./../services/VideoService";
import { wordpressAdminService } from "./../services/WordpressAdminService";

export default class Home extends WordpressTemplate {
  constructor() {
    super();

    this.initialise();
  }

  initialise = () => {
    console.log("home");

    this.wordpressTemplateProxy.htmlToggleClass = "bg-black";

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

    imageService.setImageCache($(`.image-class[data-src]:not([data-src=""])`));

    videoService.setVideos($(".video-class"));

    wordpressAdminService.getFromAdminAction("admin_get_function").then((response) => {
      console.log("Admin: ", response);
    }, (error) => {
      console.error("Error: ", error);
      throw error;
    });

    wordpressAdminService.postToAdminAction("admin_post_function", { data : data }).then((response) => {
      console.log("Admin: ", response);
    }, (error) => {
      console.error("Error: ", error);
      throw error;
    });
  }
}

new Home();
