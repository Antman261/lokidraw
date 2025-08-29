import { documentDir } from '@tauri-apps/api/path';
import { open, save } from '@tauri-apps/plugin-dialog';
import { writeTextFile, readTextFile } from '@tauri-apps/plugin-fs';
import blankDrawing from '../assets/blankDrawing.json';
import { getActiveSceneData, restoreScene } from '../excalidrawApi';
import {
  activeScene,
  activeSceneFolder,
  hasUnsaved,
  isUntitledScene,
  setSaved,
} from '../appState';
import { setSource } from '../util/setSource';
import { DEFAULT_NAME } from '../constants';

let hasInit = false;

/**
 * Retrieves the current scene's parent directory, falling back to the user's document directory if e.g. the current scene is a blank document
 */
const getSceneFolder = async () =>
  activeSceneFolder.value ?? (await documentDir());

const saveWithFilePicker = async (data?: string) => {
  const path = await save({
    filters: [{ name: 'Lokidrawings', extensions: ['lkd'] }],
    defaultPath: await getSceneFolder(),
  });
  if (!path) return;
  const sceneData = data ?? (await getActiveSceneData());
  if (!sceneData) return console.error('Invalid scene data:', sceneData);
  return await saveScene(path, sceneData);
};

const saveCurrentScene = async () => {
  if (!hasInit || isUntitledScene.value || !hasUnsaved.value) return;
  const data = await getActiveSceneData();
  await saveScene(activeScene.value, data);
  console.log('saveCurrentScene: saved');
};

const saveScene = async (path: string, data: string) => {
  await writeTextFile(path, setSource(data, 'Lokidraw'));
  setSaved();
  activeScene.value = path;
};

const loadWithFilePicker = async () => {
  const path = await open({
    multiple: false,
    directory: false,
    defaultPath: await getSceneFolder(),
  });
  if (path) activeScene.value = path;
};

const loadScene = async (path: string | null) => {
  if (path == null || path === DEFAULT_NAME) return;
  console.log('Loading scene', path);
  try {
    await restoreScene(await readTextFile(path));
    setSaved();
    console.log('Loaded', path);
  } catch (e) {
    // TODO: setup app's error boundary
    if (e instanceof Error) return console.error(e);
    if (e) return console.error(e.toString());
  }
};

export const sceneManager = {
  initSceneManager: async () => {
    if (hasInit) return;
    hasInit = true;
    setInterval(saveCurrentScene, 30000);
  },
  saveCurrentScene,
  saveWithFilePicker,
  loadSceneWithFilePicker: loadWithFilePicker,
  loadSceneFromFile: loadScene,
  newSceneWithFilePicker: () =>
    saveWithFilePicker(JSON.stringify(blankDrawing)),
};
