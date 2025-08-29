import { setHasUnsaved, theme } from './appState';
import { getExcali } from './excalidrawApi';
import { config, menuManager, sceneManager, windowManager } from './managers';
import { initHomeDirPath } from './util';

let hasInit = false;

export const initLokidraw = async () => {
  if (hasInit) return;
  console.log('Initializing...');
  hasInit = true;
  await initHomeDirPath();
  await windowManager.init();
  config.init();
  getExcali().then((ex) => {
    ex.onChange((_elements, appState) => {
      setHasUnsaved();
      theme.value = appState.theme;
    });
  });
  await menuManager.initMenuManager();
  await sceneManager.initSceneManager();
  console.log('Initialized');
};
