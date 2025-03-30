import { DEFAULT_NAME } from "../constants";

type Config = { workingDirectory: string; activeScene: string };

const configKey = "lokidrawConfig";
const defaultConfig = (): Config => ({ workingDirectory: "", activeScene: "" });
const store = window.localStorage;
let config: Config | undefined;

const _getConfig = (): Config => {
  if (!config)
    config = JSON.parse(store.getItem(configKey) ?? "null") ?? defaultConfig();
  return config!;
};

const saveConfig = () => {
  store.setItem(configKey, JSON.stringify(_getConfig()));
};

export const getConfig = (): Readonly<Config> => _getConfig();

export const setActiveScene = (sceneName: string) => {
  if (sceneName === DEFAULT_NAME) return;
  _getConfig().activeScene = sceneName;
  saveConfig();
};
export const configManager = { getConfig, setActiveScene };
