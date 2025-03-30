import { signal } from "@preact/signals";
import { sceneManager } from "./managers/sceneManager";
import { DEFAULT_NAME } from "./constants";

export type SceneMeta = { name: string; updatedAt: Date };
export type AppState = {
  activeScene: string;
  isNavOpen: boolean;
  scenes: SceneMeta[];
  hasUnsaved: boolean;
};

const store = window.localStorage;
const storeKey = "lokidrawConfig";
const saveAppState = () => {
  store.setItem(storeKey, JSON.stringify(state));
};
const loadAppState = (): AppState => {
  return JSON.parse(store.getItem(storeKey) ?? "null");
};

const loaded = loadAppState();

const isNavOpen = signal(false);
const hasUnsaved = signal(false);
const sceneName = signal(loaded.activeScene ?? DEFAULT_NAME);
const scenes = signal<SceneMeta[]>([]);

const state: AppState = {
  get hasUnsaved() {
    return hasUnsaved.value;
  },
  set isNavOpen(v: boolean) {
    isNavOpen.value = v;
  },
  get isNavOpen() {
    return isNavOpen.value;
  },
  set activeScene(v: string) {
    sceneName.value = v;
  },
  get activeScene() {
    return sceneName.value;
  },
  get scenes() {
    return scenes.value;
  },
  set scenes(v: SceneMeta[]) {
    scenes.value = v;
  },
} as const;

export const getAppState = (): Readonly<AppState> => state;

export const toggleSideNav = () => (state.isNavOpen = !state.isNavOpen);

export const setSceneName = (name: string) => (state.activeScene = name);
export const setScenes = (scenes: SceneMeta[]) => (state.scenes = scenes);
export const setHasUnsaved = () => (hasUnsaved.value = true);
export const setSaved = () => (hasUnsaved.value = false);

sceneName.subscribe(sceneManager.saveScene);
sceneName.subscribe(saveAppState);
