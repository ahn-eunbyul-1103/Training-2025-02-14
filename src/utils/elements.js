// * html쪽 자주 불러오는 요소들 데이터 집합
const ELEMENTS = {
  root: document.getElementById("root"),
  itemList: document.querySelector(".item-list"),
  studentDetail: document.querySelector(".student-detail"),
  modifiedList: document.querySelector(".modified-list"),
  jsonButtonContainer: document.querySelector(".json-button-container"),
  modalOverlay: document.querySelector(".modal-overlay"),
  modal: null, // 가변적인 값
};

export default ELEMENTS;