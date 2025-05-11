import { Menu, Submenu } from "@tauri-apps/api/menu";
import { sceneManager } from "./sceneManager";

type LokiMenuRoot = LokiSubmenu[];
type LokiMenuItem = { text: string; action: () => unknown };
type LokiSubmenu = { text: string; items: LokiMenuItem[] };

export const menuManager = (async () => {
  const rootMenu: LokiMenuRoot = [
    { text: "Lokidraw", items: [] },
    {
      text: "File",
      items: [
        { text: "New Drawing", action: sceneManager.newSceneWithFilePicker },
        { text: "Open...", action: sceneManager.loadSceneWithFilePicker },
        { text: "Save", action: sceneManager.saveCurrentScene },
        { text: "Save as...", action: sceneManager.saveWithFilePicker },
        // Add an export image menu itemh
      ],
    },
  ];
  return {
    async initMenuManager() {
      const menu = await toOsMenu(rootMenu);
      await menu.setAsAppMenu();
    },
  };
})();

const toOsMenu = async (root: LokiMenuRoot) =>
  Menu.new({
    items: await Promise.all(root.map((submenu) => Submenu.new(submenu))),
  });
