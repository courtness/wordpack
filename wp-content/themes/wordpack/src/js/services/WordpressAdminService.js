import { isEmpty } from "./../utils/helpers";

class WordpressAdminService {
  constructor() {
    this._wpAdminURL = document.getElementById("wp-admin-url").href;
    this._wpThemeURL =  document.getElementById("wp-theme-url").href;

    $("#wp-admin-url, #wp-theme-url").remove();
  }

  setAdminURL = (wpAdminURL) => {
    this._wpAdminURL = wpAdminURL;
  }

  setThemeURL = (wpThemeURL) => {
    this._wpThemeURL = wpThemeURL;
  }

  getThemeFile = (path, dataType) => {
    if (!dataType) {
      dataType = "json"
    }

    return new Promise((resolve, reject) => {
      $.ajax({
        url : `${this._wpThemeURL}/${path}`,
        action : "get",
        dataType : dataType,
        encode : true,
        success : (data) => {
          resolve(data);
        },
        error : (error) => {
          reject(error);
        }
      });
    });
  }

  getFromAction = (action) => {
    return new Promise((resolve, reject) => {
      if (isEmpty(this._wpAdminURL)) {
        reject("Wordpress wpAdminUrl unset.");
      }

      if (isEmpty(action)) {
        reject("Wordpress action unset.");
      }

      $.ajax({
        url : this._wpAdminURL,
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
      if (isEmpty(this._wpAdminURL)) {
        reject("Wordpress wpAdminUrl unset.");
      }

      if (isEmpty(action)) {
        reject("Wordpress action unset.");
      }

      if (isEmpty(data)) {
        reject("No data to post.");
      }

      data.action = action;

      $.ajax({
        url : this._wpAdminURL,
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
