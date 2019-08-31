import { eventService } from "~/src/js/services/EventService";
import { addClass, hasClass, query, removeClass } from "~/src/js/utils/dom";

class KlaviyoService {
  subscribeUrl = `//manage.kmail-lists.com/ajax/subscriptions/subscribe`;

  //

  attach = formClass => {
    const form = query(`${formClass}`);

    if (!form || !form.length) {
      return;
    }

    const formInputs = query(`${formClass}__input`);

    if (!formInputs || !formInputs.length) {
      return;
    }

    formInputs.forEach((input) => {
      const name = input.getAttribute(`name`);
      const label = query(`#label-${name}`);

      input.addEventListener(`focus`, () => {
        addClass(input, `focussed`);
        addClass(label, `focussed`);
      });
      
      input.addEventListener(`blur`, () => {
        removeClass(input, `focussed`);
        removeClass(label, `focussed`);
      });

      input.addEventListener(`input`, () => {
        const value = input.value;

        if (value === ``) {
          addClass(label, `empty`);
        } else {
          removeClass(label, `empty`);
        }

        switch (name) {
        case `email`:
          if (this.validateEmail(value)) {
            removeClass(input, `invalid`);
            removeClass(label, `invalid`);
          } else {
            addClass(input, `invalid`);
            addClass(label, `invalid`);
          }

          break;

        case `first_name`:
          if (value === ``) {
            addClass(input, `invalid`);
            addClass(label, `invalid`);
          } else {
            removeClass(input, `invalid`);
            removeClass(label, `invalid`);
          }
    
          break;
    
        default:
          break;
        }
      });
    });

    form[0].addEventListener(`submit`, e => {
      e.preventDefault();
      
      if (!this.validateInputs(formInputs)) {
        return false;
      }

      const formSubmit = query(`${formClass}__submit`);

      if (formSubmit) {
        addClass(formSubmit, `loading`);
      }

      const data = new FormData(e.target);

      fetch(this.subscribeUrl, {
        body: data,
        credentials: `same-origin`,
        headers: {
          'Accept': `application/json`,
          'Content-Type': `application/json`
        },
        method: `post`,
        mode: `no-cors`
      }).then(() => {
        eventService.emit(`klaviyo_submit`, {});
      });
      
      return false;
    });
  }

  validateInputs = inputs => {
    let valid = true;

    inputs.forEach((input) => {
      if (input.type === `email`) {
        if (this.validateEmail(input.value)) {
          if (hasClass(input, `invalid`)) {
            removeClass(input, `invalid`);
          }
        } else {
          valid = false;

          if (!hasClass(input, `invalid`)) {
            addClass(input, `invalid`);
          }
        }

      } else {
        if (input.value === ``) {
          valid = false;
  
          if (!hasClass(input, `invalid`)) {
            addClass(input, `invalid`);
          }
        } else {
          if (hasClass(input, `invalid`)) {
            removeClass(input, `invalid`);
          }
        }
      }
    });

    return valid;
  }

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

export let klaviyoService = new KlaviyoService();
