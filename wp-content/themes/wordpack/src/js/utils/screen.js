
const mobileWidth = 768;
const tabletWidth = 1024;

export function getAbsolutePosition(el) {
  let found,
      left = 0,
      top = 0,
      width = 0,
      height = 0,
      offsetBase = getAbsolutePosition.offsetBase;

  if (!offsetBase && document.body) {
    offsetBase = getAbsolutePosition.offsetBase = document.createElement(`div`);

    offsetBase.style.cssText = `position:absolute;left:0;top:0`;
    document.body.appendChild(offsetBase);
  }

  if (el && el.ownerDocument === document && `getBoundingClientRect` in el && offsetBase) {
    const boundingRect = el.getBoundingClientRect();
    const baseRect = offsetBase.getBoundingClientRect();

    found = true;
    left = boundingRect.left - baseRect.left;
    top = boundingRect.top - baseRect.top;
    width = boundingRect.right - boundingRect.left;
    height = boundingRect.bottom - boundingRect.top;
  }

  return {
    found: found,
    left: left,
    top: top,
    width: width,
    height: height,
    right: left + width,
    bottom: top + height
  };
}

export function getDevice() {
  if (isDesktop()) {
    return `desktop`;
  } else if (isTablet()) {
    return `tablet`;
  } else {
    return `mobile`;
  }
}

export function getTouchEvent(e) {
  return e.changedTouches ? e.changedTouches[0] : e;
}

export function getWindowHeight() {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

export function getWindowWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

export function inViewport(element, scrollTop) {
  return (
    scrollTop + getWindowHeight() >= getAbsolutePosition(element).top &&
    scrollTop < getAbsolutePosition(element).top + element.clientHeight
  );
}

export function isDesktop() {
  return window.matchMedia(`(min-width: ${tabletWidth + 1}px)`).matches;
}

export function isMobile() {
  return window.matchMedia(`(max-width: ${mobileWidth - 1}px)`).matches;
}

export function isMobileSafari() {
  return isMobile() && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
}

export function isTablet() {
  return window.matchMedia(`(min-width: ${mobileWidth}px) and (max-width: ${tabletWidth}px)`).matches;
}
