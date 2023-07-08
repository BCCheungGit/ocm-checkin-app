import { createGlobalState } from "react-native-global-state-hooks";

export const useLoggedIn = createGlobalState(false);
export const useLang = createGlobalState(false);
export const useName = createGlobalState('');
export const useId = createGlobalState('');