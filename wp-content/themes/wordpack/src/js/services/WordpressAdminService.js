import { isEmpty } from "./../utils/helpers";

class WordpressAdminService {
  constructor() {
    this._wpAdminUrl = $("#wp-url").data("adminurl");
    this._wpAjaxUrl = $("#wp-url").data("ajaxurl");
    this._wpThemeUrl =  $("#wp-url").data("themeurl");

    $("#wp-url").remove();
  }

  //
  // admin functions

  setAdminUrl = (wpAdminUrl) => {
    this._wpAdminUrl = wpAdminUrl;
  }

  getFromAdminAction = (action) => {
    return new Promise((resolve, reject) => {
      let check = this.validateRequest(this._wpAdminUrl, action);

      if (!check.valid) {
        reject(check.error);
      }

      $.ajax({
        url : this._wpAdminUrl,
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

  postToAdminAction = (action, data) => {
    return new Promise((resolve, reject) => {
      let check = this.validateRequestWithData(this._wpAdminUrl, action, data);

      if (!check.valid) {
        reject(check.error);
      }

      data.action = action;

      $.ajax({
        url : this._wpAdminUrl,
        method : "post",
        data : data,
        success : (response) => {
          resolve(response);
        },
        error : (error) => {
          reject(error);
        }
      });
    });
  }

  //
  // ajax functions

  setAjaxUrl = (wpAjaxUrl) => {
    this._wpAjaxUrl = wpAjaxUrl;
  }

  getFromAjaxAction = (action) => {
    return new Promise((resolve, reject) => {
      let check = this.validateRequest(this._wpAjaxUrl, action);

      if (!check.valid) {
        reject(check.error);
      }

      $.ajax({
        url : this._wpAjaxUrl,
        method : "get",
        data : {
          action : action
        },
        success : (response) => {
          resolve(response);
        },
        error : (error) => {
          reject(error);
        }
      });
    });
  }

  postToAjaxAction = (action, data) => {
    return new Promise((resolve, reject) => {
      let check = this.validateRequestWithData(this._wpAjaxUrl, action, data);

      if (!check.valid) {
        reject(check.error);
      }

      data.action = action;

      $.ajax({
        url : this._wpAjaxUrl,
        method : "post",
        data : data,
        success : (response) => {
          resolve(response);
        },
        error : (error) => {
          reject(error);
        }
      });
    });
  }

  //
  // theme files

  setThemeUrl = (wpThemeUrl) => {
    this._wpThemeUrl = wpThemeUrl;
  }

  getThemeFile = (path, dataType) => {
    if (!dataType) {
      dataType = "json"
    }

    return new Promise((resolve, reject) => {
      let check = this.validateRequest(this._wpThemeUrl, action);

      if (!check.valid) {
        reject(check.error);
      }

      $.ajax({
        url : `${this._wpThemeUrl}/${path}`,
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

  //
  // helpers

  validateRequest = (url, action) => {
    if (isEmpty(url) || isEmpty(action)) {
      return {
        valid: false,
        error: `Request data invalid (url: ${url}, action: ${action}`
      }
    }

    return { valid: true }
  }

  validateRequestWithData = (url, action, data) => {
    if (isEmpty(data) || !this.validateRequest(url, action).valid) {
      return {
        valid: false,
        error: `Request data invalid (url: ${url}, action: ${action}, data: ${data}`
      }
    }

    return { valid: true }
  }
}

export let wordpressAdminService = new WordpressAdminService();
