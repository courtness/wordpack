import {
  query,
  queryByAttribute,
  addClass,
  hasClass,
  removeClass
} from "./../utils/dom";

class ThemeService {
  constructor() {
    this._template = {
      header : query(`.header`),
      footer : query(`.footer`),
      overlayOpeners : query(`.overlay-opener`),
      overlayClosers : query(`.overlay-closer`),
      toggleableOverlays : query(`.data-overlay`)
    }

    this._initialized = false;

    this.initialize();
  }

  initialize = () => {
    if (this._initialized) {
      console.warn(`ThemeService initializer`);
      return;
    }

    this._initialized = true;

    this.addKeyboardListeners();

    this._template.overlayClosers.forEach((overlayCloser) => {
      overlayCloser.addEventListener(`click`, (e) => {
        this.hideOverlays();
      });
    });

    this._template.overlayOpeners.forEach((overlayOpener) => {
      overlayOpener.addEventListener(`click`, (e) => {
        this.showOverlay(e.currentTarget.getAttribute(`data-overlayid`));
      });
    });
  }

  addKeyboardListeners = () => {
    document.addEventListener("keyup", (e) => {
      if (e.keyCode === 27) {
        this.hideOverlays();
      }
    });
  }

  //

  showOverlay = (id) => {
    let overlay = queryByAttribute(`.data-overlay`, {
      key: `data-overlayid`,
      value: id
    });

    if (!overlay) {
      return;
    }

    addClass(document.body, `no-overflow`);
    addClass(overlay, `active`);
  }

  hideOverlays = (id) => {
    removeClass(this._template.toggleableOverlays, `active`);
    removeClass(document.body, `no-overflow`);
  }

  toggleOverlay = (id) => {
    let overlay = queryByAttribute(`.data-overlay`, {
      key: `data-id`,
      value: id
    });

    if (!overlay) {
      return;
    }

    if (!hasClass(overlay[0], `active`)) {
      this.showOverlay(id);
    } else {
      this.hideOverlays();
    }
  }
}

export let themeService = new ThemeService();
