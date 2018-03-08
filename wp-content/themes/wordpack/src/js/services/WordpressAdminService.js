import { isEmpty } from "./../utils/helpers";

class WordpressAdminService {
  constructor() {
    this.state = {
      wpAdminUrl : document.getElementById("wp-admin-url")
    }
  }

  setAdminUrl = (wpAdminUrl) => {
    this.state.wpAdminUrl = wpAdminUrl;
  }

  getFromAction = (action) => {
    return new Promise((resolve, reject) => {
      if (isEmpty(this.state.wpAdminUrl)) {
        reject("Wordpress wpAdminUrl unset. Please set this first using 'setWordpressAdminUrl'.");
      }

      if (isEmpty(action)) {
        reject("Wordpress action unset.");
      }

      $.ajax({
        url : this.state.wpAdminUrl,
        method : "get",
        data : {
          action : action
        },
        success : (response) => {
          resolve(response);
        },
        error : (response) => {
          reject(response);
        }
      });
    });
  }

  postToAction = (action, data) => {
    return new Promise((resolve, reject) => {
      if (isEmpty(this.state.wpAdminUrl)) {
        reject("Wordpress wpAdminUrl unset. Please set this first using 'setWordpressAdminUrl'.");
      }

      if (isEmpty(action)) {
        reject("Wordpress action unset.");
      }

      if (isEmpty(data)) {
        reject("No data to post.");
      }

      data.action = action;

      $.ajax({
        url : this.state.wpAdminUrl,
        method : "post",
        data : data,
        success : (response) => {
          resolve(response);
        },
        error : (response) => {
          reject(response);
        }
      });
    });
  }
}

export let wordpressAdminService = new WordpressAdminService();
