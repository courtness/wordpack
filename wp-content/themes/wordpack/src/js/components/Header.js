import { addClass, query, removeClass } from "~/src/js/utils/dom.js";

export default class Header {
  state = {
    active: false
  };

  template = {
    header: query(`.header`),
    menuButton: query(`.header__menu`)
  }

  constructor() {
    this.mount();
  }

  mount = () => {
    this.addClickListeners();
  }

  //

  addClickListeners = () => {
    this.template.menuButton[0].addEventListener(`click`, () => {
      this.state.active = !this.state.active;

      if (this.state.active) {
        addClass(this.template.menuButton, `active`);
      } else {
        removeClass(this.template.menuButton, `active`);
      }
    });
  }
}

new Header();
