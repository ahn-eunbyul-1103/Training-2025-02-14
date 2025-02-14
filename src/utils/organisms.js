import ATOMS from '../utils/atoms.js';
import ELEMENTS from '../utils/elements.js';
import MODELS from '../utils/models.js';
import STATE from '../utils/state.js';
import MOLECULES from '../utils/molecules.js';
import STUDENTS from '../storage/studentsData.js';
import CONTROLLERS from '../controllers/mainController.js';

const ORGANISMS = {
  renderStudentList: function () {
    ATOMS.clear(ELEMENTS.itemList);
    ELEMENTS.itemList.appendChild(
      MODELS.studentListModel(STUDENTS, function (student) {
        STATE.selectedStudent = student;
        ORGANISMS.renderStudentDetail(student);
      })
    );
  },
  renderStudentDetail: function (student) {
    ATOMS.clear(ELEMENTS.studentDetail);
    ELEMENTS.studentDetail.appendChild(
      MODELS.studentDetailModel(
        student,
        function (category) {
          STATE.modalMode = "add";
          STATE.modalCategory = category;
          STATE.modalIndex = null;
          CONTROLLERS.openModal();
        },
        function (category, index) {
          STATE.modalMode = "edit";
          STATE.modalCategory = category;
          STATE.modalIndex = index;
          CONTROLLERS.openModal();
        }
      )
    );
  },
  renderModifiedList: function () {
    ATOMS.clear(ELEMENTS.modifiedList);
    ELEMENTS.modifiedList.appendChild(MODELS.modifiedListModel(STATE.modified));
    ATOMS.clear(ELEMENTS.jsonButtonContainer);
    if (Object.keys(STATE.modified).length > 0) {
      const jsonBtn = MOLECULES.createButton("JSON 저장하기", "btn btn-primary", null);
      jsonBtn.addEventListener("click", function () {
        CONTROLLERS.downloadJSON();
      });
      ELEMENTS.jsonButtonContainer.appendChild(jsonBtn);
    }
  },
  renderModal: function (contentFragment) {
    ATOMS.clear(ELEMENTS.modalOverlay);
    ELEMENTS.modalOverlay.appendChild(contentFragment);
    ELEMENTS.modalOverlay.classList.add("active");
  },
};

export default ORGANISMS;