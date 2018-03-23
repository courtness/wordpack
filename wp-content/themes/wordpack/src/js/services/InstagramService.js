
class InstagramService {
  constructor() {
    this._accessToken;
  }

  setAccessToken = (accessToken) => {
    this._accessToken = accessToken;
  }

  getRecentImages = (id, count) => {
    if (!this._accessToken) {
      console.error("Access token unset.");
      return;
    }

    if (!id) {
      id = "self";
    }

    if (!count) {
      count = 3;
    }

    return new Promise((resolve, reject) => {
      $.ajax({
        url : `https://api.instagram.com/v1/users/${id}/media/recent`,
        type : "get",
        dataType : "jsonp",
        data : {
          access_token : this._accessToken,
          count : count
        },
        success : (response) => {
          let images = [];

          for (let item of response.data) {
            images.push(item.images.low_resolution.url);
          }

          resolve(images);
        },
        error: (data) => {
          reject(data);
        }
      });
    });
  }
}

export let instagramService = new InstagramService();
