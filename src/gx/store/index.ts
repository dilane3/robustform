import { createStore } from "@dilane3/gx";
import { formsSignal, modalSignal } from "../signals";
import { authSignal } from "../signals/auth";

export const store = createStore([modalSignal, formsSignal, authSignal]);
