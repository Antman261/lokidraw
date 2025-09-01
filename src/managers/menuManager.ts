import { Menu, PredefinedMenuItem, Submenu } from '@tauri-apps/api/menu';
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

const newEditWindow = async () => {
  const items = await Promise.all([
    PredefinedMenuItem.new({ item: 'Undo' }),
    PredefinedMenuItem.new({ item: 'Redo' }),
    PredefinedMenuItem.new({ item: 'Separator' }),
    PredefinedMenuItem.new({ item: 'Cut' }),
    PredefinedMenuItem.new({ item: 'Copy' }),
    PredefinedMenuItem.new({ item: 'Paste' }),
    PredefinedMenuItem.new({ item: 'Separator' }),
    PredefinedMenuItem.new({ item: 'SelectAll' }),
  ]);
  return Submenu.new({ text: 'Edit', items });
};

const toOsMenu = async (root: LokiMenuRoot) => {
  const items = await Promise.all(
    root.map((submenu) => Submenu.new({ ...submenu })).concat(newEditWindow())
  );

  items[0].append(
    await PredefinedMenuItem.new({
      text: 'About Lokidraw',
      item: {
        About: {
          name: 'Lokidraw',
          credits:
            'Made by Anthony Manning-Franklin (antman-codes.com), who stood atop the shoulders of Excalidraw.com',
          copyright:
            'MIT License\n\nCopyright (c) 2025 Anthony Manning-Franklin\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.',
        },
      },
    })
  );
  items[0].append(await PredefinedMenuItem.new({ item: 'Services' }));
  items[0].append(
    await PredefinedMenuItem.new({ item: 'Quit', text: 'Quit Lokidraw' })
  );
  return Menu.new({ items });
};
