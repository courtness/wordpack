
export function stringContains(string, substring) {
  return string.indexOf(substring) !== -1;
}

export function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isDefined(obj) {
  return typeof obj !== `undefined` && obj != null;
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

export function parseUrlArgs() {
  let query = location.search.substr(1);
  let result = {};

  query.split("&").forEach((part) => {
    let item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });

  return result;
}
