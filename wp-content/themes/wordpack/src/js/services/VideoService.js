import { eventService } from "@/src/js/services/EventService";
import { getAbsolutePosition, inViewport } from "@/src/js/utils/screen";

class VideoService {
  constructor() {}

  setPlaybackListeners = (videos) => {
    if (!videos || videos.length === 0) {
      return;
    }

    if (videos.length === 1) {
      videos = [ videos[0] ];
    }

    videos.forEach((video) => {
      video[0].onplaying = function() {
        video.playing = true;
      }

      video[0].onpause = function() {
        video.playing = false;
      }
    });

    eventService.on(`scroll`, (scrollData) => {
      videos.forEach((video) => {
        if (!inViewport(video[0], scrollData.scrollTop)) {
          video[0].pause();
        } else {
          video[0].play();
        }
      });
    });
  }
}

export let videoService = new VideoService();
