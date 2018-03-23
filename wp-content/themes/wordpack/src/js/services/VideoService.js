
class VideoService {
  constructor() {
    this._template = {
      $videos : {}
    };
  }

  setVideos = ($videos, save) => {
    $videos.each((index, element) => {
      let $element = $(element);

      $element[0].onplaying = function() {
        $element[0].playing = true;
      };

      $element[0].onpause = function() {
        $element[0].playing = false;
      };
    });

    if (save) {
      this._template.$videos = $videos;
    }
  }

  getVideos = () => {
    return this._template.$videos;
  }

  pauseVideos = ($videos) => {
    if (!$videos) {
      $videos = this._template.$videos;
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
