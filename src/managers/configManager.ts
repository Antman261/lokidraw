import { effect } from "@preact/signals";
import { activeScene, recentScenes } from "../appState";
import { DEFAULT_NAME } from "../constants";

const version = 1;
type Config = {
  scene: string;
  recentScenes: string[];
  version: typeof version;
};

const key = "lokidrawConfig";
const store = window.localStorage;

export const config = (() => {
  let config: Config;
  let hasInit = false;
  const _default = { scene: DEFAULT_NAME, recentScenes: [], version };
  config = JSON.parse(store.getItem(key) ?? "null") ?? _default;
  if (config.version !== version) console.warn("Config version mismatch");
  return {
    init: () => {
      if (hasInit) return;
      hasInit = true;
      effect(() => {
        config = {
          scene: activeScene.value,
          recentScenes: [...recentScenes.value],
          version,
        };
        store.setItem(key, JSON.stringify(config));
      });
    },
    recentScenes: config.recentScenes,
    scene: config.scene,
  };
})();
