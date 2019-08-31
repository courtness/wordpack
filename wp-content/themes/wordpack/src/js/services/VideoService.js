import { documentService } from "~/src/js/services/DocumentService";
import { eventService } from "~/src/js/services/EventService";
import { getAbsolutePosition } from "~/src/js/utils/screen";

class VideoService {
  template = {
    videos : []
  }

  //

  setPlaybackListeners = videos => {
    if (!videos || videos.length === 0) {
      return;
    }

    if (videos.length === 1) {
      videos = [ videos[0] ];
    }

    videos.forEach(video => {
      video.onplaying = () => {
        video.playing = true;
      };

      video.onpause = () => {
        video.playing = false;
      };

      this.template.videos.push(video);
    });
  }

  addScrollListener = () => {
    eventService.on(`scroll`, scrollData => {
      this.scrollHandler(scrollData);
    });
  }

  scrollHandler = scrollData => {
    this.template.videos.forEach(video => {
      const videoOffsetTop = getAbsolutePosition(video).top;

      if (scrollData.scrollTop > (videoOffsetTop - documentService.state.windowHeight) &&
          scrollData.scrollTop < videoOffsetTop + video.clientHeight) {
        if (!video.playing) {
          video.play();
        }

      } else if (video.playing) {
        video.pause();
      }
    });
  }
}

export let videoService = new VideoService();
