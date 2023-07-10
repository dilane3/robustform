import { createSignal } from "@dilane3/gx";
import Folder from "src/entities/form/Folder";
import Form from "src/entities/form/Form";

export type FormsState = {
  forms: Folder[];
  loading: boolean;
  selectedForm: Form | null;
  selectedFolder: Folder | null;
};

export const formsSignal = createSignal<FormsState>({
  name: "forms",
  state: {
    forms: [],
    loading: true,
    selectedFolder: null,
    selectedForm: null,
  },
  actions: {
    setForms: (state, forms: Folder[]) => {
      state.forms = forms;
      state.loading = false;

      return state;
    },

    selectFolder: (state, folder: Folder) => {
      state.selectedFolder = folder;

      return state;
    },

    selectForm: (state, form: Form) => {
      state.selectedForm = form;

      return state;
    },

    addForm: (state, payload: { folderId: number; form: Form }) => {
      const folder = state.forms.find(
        (folder) => folder.id === payload.folderId
      );

      if (folder) {
        folder.addForm(payload.form);
      }

      return state;
    },

    deleteForm: (state, payload: { folderId: number; formId: number }) => {
      const folder = state.forms.find(
        (folder) => folder.id === payload.folderId
      );

      if (folder) {
        folder.deleteForm(payload.formId);
      }

      return state;
    },

    addFolder: (state, folder: Folder) => {
      state.forms.push(folder);

      return state;
    }
  },
});
