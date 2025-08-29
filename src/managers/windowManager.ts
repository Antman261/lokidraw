import { getCurrentWindow, Window } from '@tauri-apps/api/window';
import { activeScene, hasUnsaved, theme } from '../appState';
import { removeHomePath } from '../util';

export const windowManager = new (class WindowManager {
  #win: Window;
  constructor() {
    this.#win = getCurrentWindow();
  }
  init() {
    this.#win.setTitleBarStyle('overlay');
    this.#win.setSizeConstraints({ minHeight: 600, minWidth: 900 });
    this.#win.onCloseRequested((event) => {
      if (hasUnsaved.value) {
        const confirmed = confirm(
          'Your unsaved changes will be lost, are you sure?'
        );
        if (!confirmed) event.preventDefault();
      }
    });
    this.updateWindowTitle();
  }
  updateWindowTitle() {
    this.#win.setTitle(`Lokidraw: ${removeHomePath(activeScene.value)}`);
  }
  setBackgroundColor() {
    this.#win.setTheme(theme.value);
  }
})();
