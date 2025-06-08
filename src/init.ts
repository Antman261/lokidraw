import { config, menuManager, sceneManager } from "./managers";

let hasInit = false;

export const initLokidraw = async () => {
  if (hasInit) return;
  hasInit = true;
  console.log("Initializing scene manager & menu manager");
  config.init();
  await Promise.all([
    sceneManager.initSceneManager(),
    menuManager.initMenuManager(),
  ]);
  console.log("Initialized");
};
