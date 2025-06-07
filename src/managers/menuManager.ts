import { Menu, Submenu } from "@tauri-apps/api/menu";
import { sceneManager as sm } from "./sceneManager";
import { LokiMenuRoot } from "./menuTypes";
import {
  exportToFileIcon,
  LoadIcon,
  save,
  saveAs,
} from "../components/excaliIcons";
import { call } from "../util/call";

const getRootMenu = (): LokiMenuRoot =>
  [
    { text: "Lokidraw", items: [] },
    {
      text: "File",
      items: [
        {
          text: "New Drawing",
          action: call(sm.newSceneWithFilePicker),
          icon: exportToFileIcon,
        },
        {
          text: "Open...",
          action: call(sm.loadSceneWithFilePicker),
          icon: LoadIcon,
        },
        { text: "Save", action: call(sm.saveCurrentScene), icon: save },
        {
          text: "Save as...",
          action: call(sm.saveWithFilePicker),
          icon: saveAs,
        },
        // Add an export image menu itemh
      ],
    },
  ] as const;

export const menuManager = {
  async initMenuManager() {
    const menu = await toOsMenu(getRootMenu());
    await menu.setAsAppMenu();
  },
  getRootMenu,
};

const toOsMenu = async (root: LokiMenuRoot) =>
  Menu.new({
    items: await Promise.all(
      root.map((submenu) => Submenu.new({ ...submenu }))
    ),
  });
