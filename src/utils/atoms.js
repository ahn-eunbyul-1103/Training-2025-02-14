const ATOMS = {
  create: function (tag, attributes, children) {
    const element = document.createElement(tag);
    if (attributes !== null && typeof attributes === "object") {
      Object.keys(attributes).forEach(function (key) {
        element.setAttribute(key, attributes[key]);
      });
    }
    if (children !== null) {
      if (Array.isArray(children)) {
        children.forEach(function (child) {
          if (typeof child === "string") {
            element.appendChild(document.createTextNode(child));
          } else {
            element.appendChild(child);
          }
        });
      } else if (typeof children === "string") {
        element.appendChild(document.createTextNode(children));
      }
    }
    return element;
  },
  appendAll: function (parent, children) {
    children.forEach(function (child) {
      parent.appendChild(child);
    });
    return parent;
  },
  clear: function (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    return element;
  },
};

export default ATOMS;