import { createSignal } from "@dilane3/gx";
import Folder from "src/entities/form/Folder";
import Form from "src/entities/form/Form";
import {
  OTHERS_FORMS_FOLDER,
  FOLDER_BIN,
  OTHERS_FORMS_FOLDER_ID,
  FOLDER_BIN_ID,
} from "./constants";
import Card from "src/entities/card/Card";
import Response from "src/entities/response/Response";

export const folderBin = new Folder({
  id: FOLDER_BIN_ID,
  name: FOLDER_BIN,
});

export const otherFormsFolder = new Folder({
  id: OTHERS_FORMS_FOLDER_ID,
  name: OTHERS_FORMS_FOLDER,
});

export type FormsState = {
  forms: Folder[];
  loading: boolean;
  selectedForm: Form | null;
  selectedFolder: Folder | null;
  updateLoading: boolean;
  updateStatus: boolean;
};

export const formsSignal = createSignal<FormsState>({
  name: "forms",
  state: {
    forms: [],
    loading: true,
    selectedFolder: null,
    selectedForm: null,
    updateLoading: false,
    updateStatus: true,
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

    updateTitleAndDescription: (
      state,
      payload: {
        folderId: number;
        formId: number;
        title: string;
        description: string;
      }
    ) => {
      const folder = state.forms.find(
        (folder) => folder.id === payload.folderId
      );

      if (folder) {
        // Find the form
        const form = folder.forms.find((form) => form.id === payload.formId);

        if (form) {
          form.title = payload.title;
          form.description = payload.description;
        }
      }

      return state;
    },

    setCardActive: (
      state,
      payload: { folderId: number; formId: number; cardId: number }
    ) => {
      const folder = state.forms.find(
        (folder) => folder.id === payload.folderId
      );

      if (folder) {
        const form = folder.forms.find((form) => form.id === payload.formId);

        if (form) {
          // Set all cards inactive
          form.cards.forEach((card) => {
            card.active = false;
          });

          // Set the card active
          const card = form.cards.find((card) => card.id === payload.cardId);

          if (card) {
            card.active = true;
          }
        }
      }

      return state;
    },

    setAllCardsInactive: (
      state,
      payload: { folderId: number; formId: number }
    ) => {
      const folder = state.forms.find(
        (folder) => folder.id === payload.folderId
      );

      if (folder) {
        const form = folder.forms.find((form) => form.id === payload.formId);

        if (form) {
          form.cards.forEach((card) => {
            card.active = false;
          });
        }
      }

      return state;
    },

    addCard: (
      state,
      payload: { folderId: number; formId: number; card: Card }
    ) => {
      const folder = state.forms.find(
        (folder) => folder.id === payload.folderId
      );

      console.log(folder);

      if (folder) {
        const form = folder.forms.find((form) => form.id === payload.formId);

        console.log(form);

        if (form) {
          // Set all cards inactive
          form.cards.forEach((card) => {
            card.active = false;
          });

          // Add new card
          form.addCard(payload.card);
        }
      }

      return state;
    },

    deleteCard: (
      state,
      payload: { folderId: number; formId: number; cardId: number }
    ) => {
      const folder = state.forms.find(
        (folder) => folder.id === payload.folderId
      );

      if (folder) {
        const form = folder.forms.find((form) => form.id === payload.formId);

        if (form) {
          form.deleteCard(payload.cardId);
        }
      }

      return state;
    },

    updateCard: (
      state,
      payload: { folderId: number; formId: number; card: Card }
    ) => {
      const folder = state.forms.find(
        (folder) => folder.id === payload.folderId
      );

      if (folder) {
        const form = folder.forms.find((form) => form.id === payload.formId);

        if (form) {
          const cardIndex = form.cards.findIndex(
            (card) => card.id === payload.card.id
          );

          if (cardIndex !== -1) {
            form.cards[cardIndex] = payload.card;
          }
        }
      }

      return state;
    },

    setUpdateProcess: (
      state,
      payload: { loading: boolean; status: boolean }
    ) => {
      state.updateLoading = payload.loading;
      state.updateStatus = payload.status || state.updateStatus;

      return state;
    },

    // Responses section

    setResponses: (
      state,
      payload: { folderId: number; formId: number; responses: Response[] }
    ) => {
      const folder = state.forms.find(
        (folder) => folder.id === payload.folderId
      );

      if (folder) {
        const form = folder.forms.find((form) => form.id === payload.formId);

        if (form) {
          form.responses = payload.responses;
        }
      }

      return state;
    },

    addResponse: (
      state,
      payload: { folderId: number; formId: number; response: Response }
    ) => {
      const folder = state.forms.find(
        (folder) => folder.id === payload.folderId
      );

      if (folder) {
        const form = folder.forms.find((form) => form.id === payload.formId);

        if (form) {
          form.addResponse(payload.response);
        }
      }

      return state;
    },
  },
});
