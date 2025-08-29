import { signal, computed, effect, batch } from '@preact/signals';
import { DEFAULT_NAME, Theme } from './constants';
import { toSceneName, toSceneDir } from './util';
import { config, sceneManager, windowManager } from './managers';

export const hasUnsaved = signal(false);
export const theme = signal<Theme>(config.theme);
export const isNavOpen = signal(false);
export const recentScenes = signal<Set<string>>(new Set(config.recentScenes));
export const activeScene = signal<string>(config.scene);
export const activeSceneName = computed(() => toSceneName(activeScene.value));
export const activeSceneFolder = computed(() => toSceneDir(activeScene.value));

const addRecentScene = (path: string) =>
  (recentScenes.value = new Set(
    [path, ...recentScenes.peek()].filter((s) => s !== DEFAULT_NAME)
  )) && console.log('Updated recent scenes');

effect(() => {
  windowManager.setBackgroundColor();
});
effect(() =>
  batch(() => {
    const scene = activeScene.value;
    addRecentScene(scene);

    windowManager.updateWindowTitle();
    sceneManager.loadSceneFromFile(scene);
  })
);
export const toggleSideNav = () => (isNavOpen.value = !isNavOpen.value);
export const isUntitledScene = computed(
  () => activeSceneName.value === DEFAULT_NAME
);
export const setHasUnsaved = () => (hasUnsaved.value = true);
export const setSaved = () => (hasUnsaved.value = false);
