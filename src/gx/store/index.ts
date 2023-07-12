import { createStore } from "@dilane3/gx";
import { formsSignal, modalSignal } from "../signals";

export const store = createStore([modalSignal, formsSignal]);
