import { signal, computed } from "@preact/signals";
import { DEFAULT_NAME } from "./constants";

const hasUnsaved = signal(false);
export const activeScene = signal<string | URL>("");
export const activeSceneName = computed(() => {
  const path = activeScene.value;
  return path instanceof URL
    ? path.pathname
    : path.split("/").at(-1)!.split(".")[0];
});

export const isUntitledScene = () => activeScene.value === DEFAULT_NAME;
export const isUpToDate = () => hasUnsaved.value === false;
export const setHasUnsaved = () => (hasUnsaved.value = true);
export const setSaved = () => (hasUnsaved.value = false);
