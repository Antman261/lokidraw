import { documentDir, homeDir } from "@tauri-apps/api/path";
import { open, save } from "@tauri-apps/plugin-dialog";
import { writeTextFile, readTextFile } from "@tauri-apps/plugin-fs";
import blankDrawing from "../assets/blankDrawing.json";
import { getExcApi } from "../excalidrawApi";
import {
  activeScene,
  isUntitledScene,
  isUpToDate,
  setHasUnsaved,
  setSaved,
} from "../appState";
import { restore, serializeAsJSON } from "@excalidraw/excalidraw";
import { getCurrentWindow } from "@tauri-apps/api/window";

let hasInit = false;

const newSceneWithFilePicker = async () => {
  const path = await saveWithFilePicker(JSON.stringify(blankDrawing));
  await loadScene(path);
};

const saveWithFilePicker = async (data: string) => {
  const path = await save({
    filters: [
      {
        name: "Lokidrawings",
        extensions: ["lkd"],
      },
    ],
    defaultPath: await documentDir(),
  });
  await saveScene(path, data);
  return path;
};

const saveCurrentScene = async () => {
  if (!hasInit) return;
  if (isUntitledScene() || isUpToDate()) return;
  const excApi = getExcApi();
  const sceneData = serializeAsJSON(
    excApi?.getSceneElements() ?? [],
    excApi?.getAppState(),
    excApi?.getFiles() ?? {},
    "database"
  );
  await saveScene(activeScene.value, sceneData);
};
const loadWithFilePicker = async () => {
  await loadScene(
    await open({
      multiple: false,
      directory: false,
      defaultPath: await documentDir(),
    })
  );
};
const loadScene = async (path: string | URL) => {
  const sceneData = JSON.parse(await readTextFile(path));
  const excApi = getExcApi();
  const restoredSceneData = restore(
    sceneData,
    excApi?.getAppState(),
    excApi?.getSceneElements()
  );
  excApi?.updateScene(restoredSceneData);
  activeScene.value = path;
  await getCurrentWindow().setTitle(
    `Lokidraw: ${path.toString().replace(await homeDir(), "~")}`
  );
};

const saveScene = async (path: string | URL, data: string) => {
  if (!hasInit) return;
  if (isUntitledScene() || isUpToDate()) return;
  console.log("is saving");

  await writeTextFile(path, data);
  setSaved();
};

const initSceneManager = async () => {
  if (hasInit) return;
  const excApi = getExcApi();
  excApi?.onChange(() => {
    console.log("exc changed");
    setHasUnsaved();
  });
  setInterval(saveScene, 30000);
  hasInit = true;
};

export const sceneManager = {
  initSceneManager,
  saveCurrentScene,
  saveWithFilePicker,
  loadSceneWithFilePicker: loadWithFilePicker,
  newSceneWithFilePicker,
};
