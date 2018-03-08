import { isDefined } from "./../utils/helpers";

class VideoService {
  constructor() {
    this.state = {
      loaded : false,
      $videos : {}
    }
  }

  setVideos = ($videos) => {
    $videos.each((index, element) => {
      let $element = $(element);

      $element[0].onplaying = function() {
        $element[0].playing = true;
      };

      $element[0].onpause = function() {
        $element[0].playing = false;
      };
    });

    this.state.$videos = $videos;
  }

  getVideos = () => {
    return this.state.$videos;
  }

  pauseVideos = ($videos) => {
    if (!isDefined($videos)) {
      $videos = this.state.$videos;
    }

    for (let $video of $videos) {
      if (typeof $video[0].playing === "undefined" || $video[0].playing === null) {
        $video[0].playing = true;
      }

      if ($video[0].playing) {
        $video[0].pause();
      }
    }
  }
}

export let videoService = new VideoService();
