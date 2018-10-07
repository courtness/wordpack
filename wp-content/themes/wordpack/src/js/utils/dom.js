
//
// data parsing

export function isIterable(object) {
  return typeof object[Symbol.iterator] === "function";
}

export function domParse(object) {
  if (!object) {
    return [];
  }

  if (!isIterable(object)) {
    object = [ object ];
  }

  return Array.from(object);
}

//
// document

export function getDocumentHeight() {
  let body = document.body;
  let html = document.documentElement;

  return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
}

//
// query

export function query(selector) {
  let collection;

  if (selector.startsWith(`.`)) {
    collection = document.getElementsByClassName(selector.substring(1));
  } else if (selector.startsWith(`#`)) {
    collection = document.getElementById(selector.substring(1));
  } else if (/^[a-zA-Z].*/.test(selector)) {
    collection = document.getElementsByTagName(selector);
  } else {
    console.warn(`query: Unsupported prefix '${selector.charAt(0)}'`);
    return [];
  }

  return domParse(collection);
}

export function queryByAttribute(selector, attributeMap) {
  if (selector.startsWith(`#`)) {
    return query(selector);
  }

  if (!attributeMap || !attributeMap.key) {
    return;
  }

  let collection = query(selector);
  let found = [];

  collection.forEach((item) => {
    if (!attributeMap.value) {
      if (item.hasAttribute(attributeMap.key.toString())) {
        found.push(item);
      }
    } else if (item.getAttribute(attributeMap.key) && item.getAttribute(attributeMap.key).toString() === attributeMap.value.toString()) {
      found.push(item);
    }
  });

  return found;
}

export function queryTagsInParent(parent, tagName) {
  return domParse(parent.getElementsByTagName(tagName));
}

//
// class management

export function hasClass(node, className) {
  if (!node || !node.className) {
    return false;
  }

  return node.classList.contains(className);
}

export function addClass(nodes, className) {
  if (className.startsWith(`.`)) {
    className = className.substring(1);
  }

  domParse(nodes).forEach((element) => {
    if (!hasClass(element, className) && element.classList) {
      element.classList.add(className);
    }
  });
}

//
// TODO : combine with addClass

export function addClasses(nodes, classNames) {
  for (let className of classNames) {
    addClass(nodes, className);
  }
}

export function removeClass(nodes, className) {
  if (className.startsWith(`.`)) {
    className = className.substring(1);
  }

  domParse(nodes).forEach((element) => {
    if (hasClass(element, className) && element.classList) {
      element.classList.remove(className);
    }
  });
}

//
// TODO : combine with removeClass

export function removeClasses(nodes, classNames) {
  for (let className of classNames) {
    removeClass(nodes, className);
  }
}

export function toggleClass(nodes, className) {
  if (className.startsWith(`.`)) {
    className = className.substring(1);
  }

  domParse(nodes).forEach((element) => {
    element.classList.toggle(className);
  });
}

export function findChildrenByClass(parent, className) {
  let found = [];

  if (!parent || !parent.children) {
    return found;
  }

  if (className.startsWith(`.`)) {
    className = className.substring(1);
  }

  let children = domParse(parent.children);

  children.forEach((child) => {
    if (hasClass(child, className)) {
      found.push(child);
    }
  });

  return found;
}

//
// style injection

export function injectStyle(element, property, value) {
  if (typeof value !== `string`) {
    value = value.toString();
  }

  element.style[property] = value;
}

export function injectStyleWithVendor(element, property, value) {
  injectStyle(element, `Webkit${property.charAt(0).toUpperCase()}${property.substr(1)}`, value);
  injectStyle(element, `Moz${property.charAt(0).toUpperCase()}${property.substr(1)}`, value);
  injectStyle(element, `ms${property.charAt(0).toUpperCase()}${property.substr(1)}`, value);
  injectStyle(element, `O${property.charAt(0).toUpperCase()}${property.substr(1)}`, value);
  injectStyle(element, `${property.charAt(0).toLowerCase()}${property.substr(1)}`, value);
}
