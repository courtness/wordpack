import { query } from "~/src/js/utils/dom";
import { isEmpty } from "~/src/js/utils/helpers";

class WordpressAdminService {
  wpAdminUrl;
  wpAjaxUrl;
  
  initialize = () => {
    const wpUrl = query(`#wp-url`)[0];

    this.wpAdminUrl = wpUrl.getAttribute(`data-adminurl`);
    this.wpAjaxUrl = wpUrl.getAttribute(`data-ajaxurl`);

    wpUrl.parentNode.removeChild(wpUrl);
  }

  //
  // ajax functions

  postToAjaxAction = (action, data) => {
    return new Promise((resolve, reject) => {
      const check = this.validateRequestWithData(this.wpAjaxUrl, action, data);

      if (!check.valid) {
        reject(check.error);
      }

      const body = `action=${action}&data=${JSON.stringify(data)}`;

      const request = {
        body : body,
        credentials : `same-origin`,
        headers : new Headers({
          "Content-Type": `application/x-www-form-urlencoded; charset=utf-8`
        }),
        method : `POST`
      };

      fetch(this.wpAjaxUrl, request)
        .then(this.fetchHandler)
        .then((response) => response.text())
        .then((body) => {
          resolve(body);
        })
        .catch((error) => {
          reject(error);
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
      };
    }

    return { valid: true };
  }

  validateRequestWithData = (url, action, data) => {
    if (isEmpty(data) || !this.validateRequest(url, action).valid) {
      return {
        valid: false,
        error: `Request data invalid (url: ${url}, action: ${action}, data: ${data}`
      };
    }

    return { valid: true };
  }

  fetchHandler = (response) => {
    if (!response.ok) {
      throw Error(response.status);
    }

    return response;
  }
}

export let wordpressAdminService = new WordpressAdminService();
