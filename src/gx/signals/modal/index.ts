import { createSignal } from "@dilane3/gx";

export enum ModalType {
  CREATE_FORM = "CREATE_FORM",
  CREATE_FOLDER = "CREATE_FOLDER",
  DEFAULT = "DEFAULT"
}

export type ModalState = {
  isOpened: boolean;
  type: ModalType;
}

export const modalState = createSignal({
  name: "modal",
  state: {
    isOpened: false,
    type: ModalType.DEFAULT
  },
  actions: {
    open: (state, payload: ModalType) => {
      state.isOpened = true;
      state.type = payload;

      return state;
    },

    close: (state) => {
      state.isOpened = false;
      state.type = ModalType.DEFAULT;

      return state;
    }
  }
})