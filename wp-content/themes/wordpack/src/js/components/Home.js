import WordpressTemplate from "./modules/WordpressTemplate";
import { eventService } from "./../services/EventService";
import { imageService } from "./../services/ImageService";
import { VideoService } from "./../services/VideoService";
import { wordpressAdminService } from "./../services/WordpressAdminService";
import { data } from "./../config/data";

export default class Home extends WordpressTemplate {
  constructor() {
    super();

    this.wordpressTemplateProxy.htmlBackgroundColor = data.colors.black;

    this.initialise();
  }

  initialise = () => {
    console.log("home");

    eventService.on("device", (device) => {
      console.log("Device changed: ", device);

      if (device === "desktop") {
        // do desktop things
      } else {
        // undo desktop things
      }
    });

    imageService.setImageCache($(`.image-class[data-src]:not([data-src=""])`));

    videoService.setVideos($(".video-class"));

    wordpressAdminService.getFromAction("admin_get_function").then((response) => {
      console.log("Admin: ", response);
    }, (error) => {
      console.error("Error: ", error);
      throw error;
    });

    wordpressAdminService.postToAction("admin_post_function", { data : data }).then((response) => {
      console.log("Admin: ", response);
    }, (error) => {
      console.error("Error: ", error);
      throw error;
    });
  }
}

new Home();
