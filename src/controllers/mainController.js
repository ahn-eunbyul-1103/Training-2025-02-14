import ATOMS from '../utils/atoms.js';
import ELEMENTS from '../utils/elements.js';
import STATE from '../utils/state.js';
import SELECTORS from '../constants/selectorConstants.js';
import MODELS from '../utils/models.js';
import ORGANISMS from '../utils/organisms.js';

// * 화면 조작과 관련된 컨트롤러
const CONTROLLERS = {
  // * 모달창 오픈
  openModal: function () {
    ATOMS.clear(ELEMENTS.modalOverlay);
    const modalContent = ATOMS.create("div", { class: "modal-content" }, []);
    ELEMENTS.modalOverlay.appendChild(modalContent);
    ELEMENTS.modal = modalContent;
    ELEMENTS.modalOverlay.addEventListener("click", CONTROLLERS.closeModal);
    ELEMENTS.modal.addEventListener("click", function (event) {
      event.stopPropagation();
    });
    const mode = STATE.modalMode;
    let currentValue = "";
    if (mode === "edit") {
      currentValue = STATE.selectedStudent.food[STATE.modalCategory][STATE.modalIndex];
    }
    const contentFragment = MODELS.modalContentModel(mode, currentValue);
    ATOMS.clear(ELEMENTS.modal);
    ELEMENTS.modal.appendChild(contentFragment);
    ELEMENTS.modalOverlay.classList.add("active");
    const inputElement = document.getElementById(SELECTORS.foodInput);
    inputElement.focus();
    const handlers = [
      {
        selector: '[data-action="' + SELECTORS.confirm + '"]',
        event: "click",
        handler: CONTROLLERS.handleConfirm,
      },
      {
        selector: '[data-action="' + SELECTORS.delete + '"]',
        event: "click",
        handler: CONTROLLERS.handleDelete,
      },
      {
        selector: '[data-action="' + SELECTORS.cancel + '"]',
        event: "click",
        handler: CONTROLLERS.closeModal,
      },
      {
        selector: "#" + SELECTORS.foodInput,
        event: "keydown",
        handler: function (event) {
          if (event.key === "Enter") {
            CONTROLLERS.handleConfirm();
          }
        },
      },
    ];
    handlers.forEach(function (config) {
      const el = ELEMENTS.modal.querySelector(config.selector);
      if (el) {
        el.addEventListener(config.event, config.handler);
      }
    });
  },
  // * 모달창 종료
  closeModal: function () {
    ELEMENTS.modalOverlay.classList.remove("active");
    ATOMS.clear(ELEMENTS.modal);
  },
  // * 수정 및 추가 동작 관련
  handleConfirm: function () {
    const inputElement = document.getElementById(SELECTORS.foodInput);
    const inputValue = inputElement.value.trim();
    if (inputValue === "") {
      alert("음식 이름을 입력해주세요.");
      return;
    }
    if (STATE.modalMode === "edit") {
      STATE.selectedStudent.food[STATE.modalCategory][STATE.modalIndex] = inputValue;
    } else if (STATE.modalMode === "add") {
      STATE.selectedStudent.food[STATE.modalCategory].push(inputValue);
    }
    STATE.modified[STATE.selectedStudent.order] = STATE.selectedStudent;
    ORGANISMS.renderStudentDetail(STATE.selectedStudent);
    ORGANISMS.renderModifiedList();
    CONTROLLERS.closeModal();
  },
  // * 삭제 동작 관련
  handleDelete: function () {
    STATE.selectedStudent.food[STATE.modalCategory].splice(STATE.modalIndex, 1);
    STATE.modified[STATE.selectedStudent.order] = STATE.selectedStudent;
    ORGANISMS.renderStudentDetail(STATE.selectedStudent);
    ORGANISMS.renderModifiedList();
    CONTROLLERS.closeModal();
  },
  // * JSON 다운로드 관련
  downloadJSON: function () {
    const jsonData = JSON.stringify(Object.values(STATE.modified), null, 2);
    const dataBlob = new Blob([jsonData], {
      type: "application/json",
    });
    const blobUrl = URL.createObjectURL(dataBlob);
    const downloadLink = ATOMS.create(
      "a",
      { href: blobUrl, download: "modified_students.json" },
      ""
    );
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(blobUrl);
  },
};

export default CONTROLLERS;