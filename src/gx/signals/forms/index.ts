import { createSignal } from "@dilane3/gx";
import Folder from "src/entities/form/Folder";
import Form from "src/entities/form/Form";
import { OTHERS_FORMS_FOLDER, FOLDER_BIN } from "./constants";
import Card from "src/entities/card/Card";

const folderBin = new Folder({
  id: 1,
  name: FOLDER_BIN,
});

const otherFormsFolder = new Folder({
  id: 2,
  name: OTHERS_FORMS_FOLDER,
});

export type FormsState = {
  forms: Folder[];
  loading: boolean;
  selectedForm: Form | null;
  selectedFolder: Folder | null;
};

export const formsSignal = createSignal<FormsState>({
  name: "forms",
  state: {
    forms: [otherFormsFolder, folderBin],
    loading: true,
    selectedFolder: null,
    selectedForm: null,
  },
  actions: {
    setForms: (state, forms: Folder[]) => {
      for (const form of forms) {
        state.forms.push(form);
      }

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

      if (folder) {
        const form = folder.forms.find((form) => form.id === payload.formId);

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
  },
});
