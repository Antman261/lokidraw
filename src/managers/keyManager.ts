import { callArg } from '../util';

const modifierKeys = ['Cmd', 'Shift', 'Meta', 'Alt'] as const;

export const keyManager = new (class KeyManager {
  #combos: Record<string, Set<() => unknown>>;

  constructor() {
    this.#combos = {};

    window.addEventListener('keydown', (ev) => {
      const keyCombo = this.#combos[toKeyString(ev)];
      if (!keyCombo) return;
      ev.preventDefault();
      [...keyCombo].forEach(callArg);
    });
  }
  registerShortcut(keyCombo: string, callback: () => unknown) {
    this.#combos[keyCombo] = this.#combos[keyCombo] ?? new Set();
    this.#combos[keyCombo].add(callback);
  }
})();

const toKeyString = (ev: KeyboardEvent): string => {
  const keys: string[] = [];
  if (modifierKeys.includes(ev.key as any)) return '';
  if (ev.ctrlKey || ev.metaKey) keys.push('Cmd');
  if (ev.shiftKey) keys.push('Shift');
  keys.push(ev.key.toUpperCase());

  return keys.join('+');
};
