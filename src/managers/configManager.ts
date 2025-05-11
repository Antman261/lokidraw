import { activeScene } from "../appState";
import { DEFAULT_NAME } from "../constants";

type Config = { scene: string; version: 1 };

const configKey = "lokidrawConfig";
const store = window.localStorage;
const version = 1;

const defaultConfig = (): Config => ({ scene: DEFAULT_NAME, version });
const saveConfig = (cfg: Omit<Config, "version">) =>
  store.setItem(configKey, JSON.stringify({ ...cfg, version }));

activeScene.subscribe((scene) => {
  if (scene === DEFAULT_NAME) return;
  saveConfig({ scene: scene.toString() });
});

export const getConfig = (): Readonly<Config> => {
  const config =
    JSON.parse(store.getItem(configKey) ?? "null") ?? defaultConfig();
  if (config?.version !== 1) return defaultConfig();
  return config!;
};
