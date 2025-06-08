import { effect } from '@preact/signals';
import { activeScene, recentScenes, theme } from '../appState';
import { DEFAULT_NAME, Theme } from '../constants';

const version = 1;
type Config = {
  scene: string;
  recentScenes: string[];
  theme: Theme;
  version: typeof version;
};

const key = 'lokidrawConfig';
const store = window.localStorage;

const saveConfig = (cfg: Omit<Config, 'version'>) => {
  _config = { ...cfg, version };
  console.log({ _config });
  store.setItem(key, JSON.stringify(_config));
};

let _config: Config = {
  scene: DEFAULT_NAME,
  recentScenes: [],
  theme: 'light',
  version,
};

export const config = (() => {
  let hasInit = false;
  _config = JSON.parse(store.getItem(key) ?? 'null') ?? _config;
  if (_config.version !== version) console.warn('Config version mismatch');
  return {
    init: () => {
      if (hasInit) return;
      hasInit = true;
      effect(() =>
        saveConfig({
          scene: activeScene.value,
          recentScenes: [...recentScenes.value],
          theme: theme.value,
        })
      );
    },
    recentScenes: _config.recentScenes,
    scene: _config.scene,
    theme: _config.theme,
  };
})();
