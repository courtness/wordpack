
export function stringContains(string, substring) {
  return string.indexOf(substring) !== -1;
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
