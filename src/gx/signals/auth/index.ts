import { createSignal } from "@dilane3/gx";
import User from "src/entities/user/User";

export type AuthState = {
  user: User | null;
  loading: boolean;
}

export const authSignal = createSignal<AuthState>({
  name: "auth",
  state: {
    user: null,
    loading: true,
  },
  actions: {
    login: (state, payload: User) => {
      state.user = payload;
      state.loading = false;

      return state;
    },

    logout: (state) => {
      state.user = null;

      return state;
    },
  }
})