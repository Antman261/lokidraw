import { signal, computed, effect, batch } from '@preact/signals';
import { DEFAULT_NAME, Theme } from './constants';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { toSceneName, removeHomePath, toSceneDir } from './util';
import { config, sceneManager } from './managers';
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';

const win = getCurrentWindow();
const webviewWindow = getCurrentWebviewWindow();

const hasUnsaved = signal(false);
export const theme = signal<Theme>(config.theme);
export const isNavOpen = signal(false);
export const recentScenes = signal<Set<string>>(new Set(config.recentScenes));
export const activeScene = signal<string>(config.scene);
export const activeSceneName = computed(() => toSceneName(activeScene.value));
export const activeSceneFolder = computed(() => toSceneDir(activeScene.value));

const addRecentScene = (path: string) =>
  (recentScenes.value = new Set([path, ...recentScenes.peek()])) &&
  console.log('Updated recent scenes');

export const changeScene = (path: string) =>
  batch(() => addRecentScene((activeScene.value = path)));

effect(() => {
  const result = webviewWindow.setBackgroundColor(
    theme.value === 'light' ? [255, 255, 255] : [20, 20, 20]
  );
  console.log({ result });
});
effect(() => {
  const scene = activeScene.value;
  console.log({ scene });
  Promise.all([
    sceneManager.loadSceneFromFile(scene),
    (async () => {
      const cleanPath = await removeHomePath(scene);
      console.log('Setting window title:', cleanPath);
      const setTitleResult = await win.setTitle(`Lokidraw: ${cleanPath}`);
      console.log('setTitleR.esult:', setTitleResult);
    })(),
  ]);
});
export const toggleSideNav = () => (isNavOpen.value = !isNavOpen.value);
export const isUntitledScene = () => activeSceneName.value === DEFAULT_NAME;
export const isUpToDate = () => hasUnsaved.value === false;
export const setHasUnsaved = () => (hasUnsaved.value = true);
export const setSaved = () => (hasUnsaved.value = false);
