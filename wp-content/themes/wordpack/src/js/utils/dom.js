//
// data parsing

export function isIterable(object) {
  return typeof object[Symbol.iterator] === `function`;
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

export function query(selector, context) {
  context = context || document;

  if (/^(#?[\w-]+|\.[\w-.]+)$/.test(selector)) {
    switch (selector.charAt(0)) {
    case `#`:
      return [context.getElementById(selector.substr(1))];
    case `.`:
      return [].slice.call(
        context.getElementsByClassName(selector.substr(1).replace(/\./g, ` `))
      );
    default:
      return [].slice.call(context.getElementsByTagName(selector));
    }
  }

  return [].slice.call(context.querySelectorAll(selector));
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
// class management

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

export function hasClass(node, className) {
  if (!node || !node.className) {
    return false;
  }

  return node.classList.contains(className);
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

export function toggleClass(nodes, className) {
  if (className.startsWith(`.`)) {
    className = className.substring(1);
  }

  domParse(nodes).forEach((element) => {
    element.classList.toggle(className);
  });
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
