
const mobileWidth = 768;
const tabletWidth = 1024;

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

export function getWindowWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

export function getDevice() {
  if (isDesktop()) {
    return "desktop";
  } else if (isTablet()) {
    return "tablet";
  } else {
    return "mobile";
  }
}
