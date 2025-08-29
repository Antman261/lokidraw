import { Menu, Submenu } from '@tauri-apps/api/menu';
import { sceneManager as sm } from './sceneManager';
import { LokiMenuRoot } from './menuTypes';
import {
  exportToFileIcon,
  LoadIcon,
  save,
  saveAs,
} from '../components/excaliIcons';
import { call } from '../util/call';
import { keyManager } from './keyManager';

const getRootMenu = (): LokiMenuRoot =>
  [
    { text: 'Lokidraw', items: [] },
    {
      text: 'File',
      items: [
        {
          text: 'New Drawing',
          action: call(sm.newSceneWithFilePicker),
          icon: exportToFileIcon,
          shortcut: 'Cmd+N',
        },
        {
          text: 'Open...',
          action: call(sm.loadSceneWithFilePicker),
          icon: LoadIcon,
          shortcut: 'Cmd+O',
        },
        {
          text: 'Save',
          action: call(sm.saveCurrentScene),
          icon: save,
          shortcut: 'Cmd+S',
        },
        {
          text: 'Save as...',
          action: call(sm.saveWithFilePicker),
          icon: saveAs,
          shortcut: 'Cmd+Shift+S',
        },
        // Add an export image menu item
      ],
    },
  ] as const;

export const menuManager = {
  async initMenuManager() {
    const rootMenu = getRootMenu();
    for (const submenu of rootMenu) {
      for (const menuItem of submenu.items)
        if (menuItem.shortcut)
          keyManager.registerShortcut(menuItem.shortcut, menuItem.action);
    }
    const menu = await toOsMenu(rootMenu);
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
