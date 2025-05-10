import { Menu, Submenu } from "@tauri-apps/api/menu";
import { sceneManager } from "./sceneManager";

const newDrawing = () => {
  console.log("New drawing clicked");
};

export const menuManager = (async () => {
  const menu = await Menu.new({
    items: [
      await Submenu.new({
        text: "Lokidraw",
      }),
      await Submenu.new({
        text: "File",
        items: [
          { text: "New Drawing", action: sceneManager.newSceneWithFilePicker },
          { text: "Open...", action: sceneManager.loadSceneWithFilePicker },
          { text: "Save", action: sceneManager.saveCurrentScene },
          { text: "Save as...", action: sceneManager.saveWithFilePicker },
        ],
      }),
    ],
  });
  return {
    async initMenuManager() {
      await menu.setAsAppMenu();
    },
  };
})();
