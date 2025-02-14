import MOLECULES from '../utils/molecules.js';
import ATOMS from '../utils/atoms.js';
import SELECTORS from '../constants/selectorConstants.js';

const MODELS = {
  studentListModel: function (students, onSelect) {
    const fragment = document.createDocumentFragment();
    students.forEach(function (student) {
      const item = MOLECULES.createStudentListItem(student);
      item.addEventListener("click", function () {
        onSelect(student);
      });
      fragment.appendChild(item);
    });
    return fragment;
  },
  studentDetailModel: function (student, onAdd, onFoodSelect) {
    const fragment = document.createDocumentFragment();
    const likeSection = ATOMS.create("div", { class: "m-b-1" }, []);
    const likeHeader = ATOMS.create(
      "div",
      { class: "flex justify-between", style: "align-items: center;" },
      []
    );
    const likeTitle = ATOMS.create("h3", null, "좋아하는 음식");
    const addLikeBtn = MOLECULES.createButton(
      "+ 추가하기",
      "btn btn-primary",
      SELECTORS.addLike
    );
    likeHeader.appendChild(likeTitle);
    likeHeader.appendChild(addLikeBtn);
    likeSection.appendChild(likeHeader);
    const likeList = ATOMS.create("div", { class: "like-list" }, []);
    student.food.like.forEach(function (food, index) {
      const foodItem = MOLECULES.createFoodItem(food, "like", index);
      foodItem.addEventListener("click", function () {
        onFoodSelect("like", index);
      });
      likeList.appendChild(foodItem);
    });
    likeSection.appendChild(likeList);
    const hateSection = ATOMS.create("div", null, []);
    const hateHeader = ATOMS.create(
      "div",
      { class: "flex justify-between", style: "align-items: center;" },
      []
    );
    const hateTitle = ATOMS.create("h3", null, "싫어하는 음식");
    const addHateBtn = MOLECULES.createButton(
      "+ 추가하기",
      "btn btn-primary",
      SELECTORS.addHate
    );
    hateHeader.appendChild(hateTitle);
    hateHeader.appendChild(addHateBtn);
    hateSection.appendChild(hateHeader);
    const hateList = ATOMS.create("div", { class: "hate-list" }, []);
    student.food.hate.forEach(function (food, index) {
      const foodItem = MOLECULES.createFoodItem(food, "hate", index);
      foodItem.addEventListener("click", function () {
        onFoodSelect("hate", index);
      });
      hateList.appendChild(foodItem);
    });
    hateSection.appendChild(hateList);
    ATOMS.appendAll(fragment, [likeSection, hateSection]);
    addLikeBtn.addEventListener("click", function () {
      onAdd("like");
    });
    addHateBtn.addEventListener("click", function () {
      onAdd("hate");
    });
    return fragment;
  },
  modalContentModel: function (mode, currentValue) {
    const fragment = document.createDocumentFragment();
    if (mode === "edit") {
      const title = ATOMS.create("h2", { class: "text-xl font-semibold m-b-1" }, "수정하기");
      const inputField = ATOMS.create(
        "input",
        {
          type: "text",
          id: SELECTORS.foodInput,
          class: "input-field m-b-1",
          placeholder: "음식 이름 입력",
        },
        ""
      );
      inputField.value = currentValue;
      const btnContainer = ATOMS.create(
        "div",
        { class: "flex gap-2", style: "margin-top: var(--spacing-1);" },
        []
      );
      const confirmBtn = MOLECULES.createButton(
        "수정하기",
        "btn btn-primary",
        SELECTORS.confirm
      );
      const deleteBtn = MOLECULES.createButton(
        "삭제하기",
        "btn btn-secondary",
        SELECTORS.delete
      );
      const cancelBtn = MOLECULES.createButton("취소", "btn btn-secondary", SELECTORS.cancel);
      ATOMS.appendAll(btnContainer, [confirmBtn, deleteBtn, cancelBtn]);
      ATOMS.appendAll(fragment, [title, inputField, btnContainer]);
    } else if (mode === "add") {
      const title = ATOMS.create("h2", { class: "text-xl font-semibold m-b-1" }, "추가하기");
      const inputField = ATOMS.create(
        "input",
        {
          type: "text",
          id: SELECTORS.foodInput,
          class: "input-field m-b-1",
          placeholder: "음식 이름 입력",
        },
        ""
      );
      const btnContainer = ATOMS.create(
        "div",
        { class: "flex gap-2", style: "margin-top: var(--spacing-1);" },
        []
      );
      const confirmBtn = MOLECULES.createButton(
        "추가하기",
        "btn btn-primary",
        SELECTORS.confirm
      );
      const cancelBtn = MOLECULES.createButton("취소", "btn btn-secondary", SELECTORS.cancel);
      ATOMS.appendAll(btnContainer, [confirmBtn, cancelBtn]);
      ATOMS.appendAll(fragment, [title, inputField, btnContainer]);
    }
    return fragment;
  },
  modifiedListModel: function (modifiedStudents) {
    const fragment = document.createDocumentFragment();
    Object.keys(modifiedStudents).forEach(function (key) {
      const student = modifiedStudents[key];
      const item = ATOMS.create("div", { class: "modified-item" }, []);
      const title = ATOMS.create("strong", null, student.order + ". " + student.name);
      const likeInfo = ATOMS.create(
        "div",
        null,
        "수정된 좋아하는 음식: " + (student.food.like.join(", ") || "없음")
      );
      const hateInfo = ATOMS.create(
        "div",
        null,
        "수정된 싫어하는 음식: " + (student.food.hate.join(", ") || "없음")
      );
      ATOMS.appendAll(item, [title, likeInfo, hateInfo]);
      fragment.appendChild(item);
    });
    return fragment;
  },
};

export default MODELS;