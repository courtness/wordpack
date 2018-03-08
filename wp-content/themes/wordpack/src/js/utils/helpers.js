
export function stringContains(string, substring) {
  return string.indexOf(substring) !== -1;
}

export function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isDefined(obj) {
  return typeof obj !== 'undefined' && obj != null;
}

export function isEmpty(obj) {
  if (!isDefined(obj)) {
    return true;
  }

  return obj === "" || obj === {};
}

export function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isInViewport($element) {
  var elementTop = $element.offset().top;
  var elementBottom = elementTop + $element.outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
}
