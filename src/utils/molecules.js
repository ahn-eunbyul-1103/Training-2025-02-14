import ATOMS from '../utils/atoms.js';

const MOLECULES = {
  createButton: function (text, classes, dataAction) {
    const attrs = { class: classes };
    if (dataAction) {
      attrs["data-action"] = dataAction;
    }
    return ATOMS.create("button", attrs, text);
  },
  createFoodItem: function (food, category, index) {
    const attrs = {
      class: "list-item rounded-sm transition-colors hover-bg",
      "data-category": category,
      "data-index": String(index),
    };
    return ATOMS.create("div", attrs, food);
  },
  createStudentListItem: function (student) {
    return ATOMS.create(
      "div",
      { class: "list-item rounded-sm transition-colors hover-bg" },
      student.order + ". " + student.name
    );
  },
};

export default MOLECULES;