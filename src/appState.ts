import { signal, computed, effect, batch } from "@preact/signals";
import { DEFAULT_NAME } from "./constants";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { toSceneName, removeHomePath, toSceneDir } from "./util/path";
import { config } from "./managers";

const hasUnsaved = signal(false);
export const isNavOpen = signal(false);
export const recentScenes = signal<Set<string>>(new Set(config.recentScenes));
export const activeScene = signal<string>(config.scene);
export const activeSceneName = computed(() => toSceneName(activeScene.value));
export const activeSceneFolder = computed(() => toSceneDir(activeScene.value));

const addRecentScene = (path: string) =>
  (recentScenes.value = new Set([path, ...recentScenes.peek()])) &&
  console.log("Updated recent scenes");

export const changeScene = (path: string) =>
  batch(() => addRecentScene((activeScene.value = path)));

effect(() => {
  const scene = activeScene.value;
  (async () => {
    const cleanPath = await removeHomePath(scene);
    console.log("Setting window title:", cleanPath);
    const win = await getCurrentWindow();
    console.log({ win });
    const setTitleResult = await win.setTitle(`Lokidraw: ${cleanPath}`);
    console.log("Set window title to", cleanPath);
    console.log("setTitleResult:", setTitleResult);
  })();
});
export const toggleSidebar = () => (isNavOpen.value = !isNavOpen.value);
export const isUntitledScene = () => activeSceneName.value === DEFAULT_NAME;
export const isUpToDate = () => hasUnsaved.value === false;
export const setHasUnsaved = () => (hasUnsaved.value = true);
export const setSaved = () => (hasUnsaved.value = false);
