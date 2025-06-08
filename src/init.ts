import { setHasUnsaved, theme } from './appState';
import { getExcali } from './excalidrawApi';
import { config, menuManager } from './managers';

let hasInit = false;

export const initLokidraw = async () => {
  if (hasInit) return;
  hasInit = true;
  console.log('Loading config');
  config.init();
  console.log('Initializing scene manager & menu manager');
  getExcali().then((ex) => {
    ex.onChange((elements, appState) => {
      setHasUnsaved();
      theme.value = appState.theme;
    });
  });
  await menuManager.initMenuManager();
  console.log('Initialized');
};
