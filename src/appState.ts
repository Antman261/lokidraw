import { signal, computed } from "@preact/signals";
import { DEFAULT_NAME } from "./constants";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { convertPathToScene, removeHomePath } from "./util/path";

const hasUnsaved = signal(false);
export const activeScene = signal<string | URL>(DEFAULT_NAME);
export const activeSceneName = computed(() => {
  const path = activeScene.value;
  return convertPathToScene(path);
});
activeScene.subscribe(async (path) => {
  const cleanPath = await removeHomePath(path);
  console.log("Setting window title:", cleanPath);
  hasUnsaved.value = false;
  await getCurrentWindow().setTitle(`Lokidraw: ${cleanPath}`);
});

export const isUntitledScene = () => activeSceneName.value === DEFAULT_NAME;
export const isUpToDate = () => hasUnsaved.value === false;
export const setHasUnsaved = () => (hasUnsaved.value = true);
export const setSaved = () => (hasUnsaved.value = false);
