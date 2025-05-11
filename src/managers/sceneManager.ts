import { documentDir } from "@tauri-apps/api/path";
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
import { getConfig } from "./configManager";
import { DEFAULT_NAME } from "../constants";
import { removeHomePath } from "../util/path";

let hasInit = false;

const newSceneWithFilePicker = async () => {
  const path = await saveWithFilePicker(JSON.stringify(blankDrawing));
  await loadScene(path);
};

const saveWithFilePicker = async (data?: string) => {
  const path = await save({
    filters: [
      {
        name: "Lokidrawings",
        extensions: ["lkd"],
      },
    ],
    defaultPath: await documentDir(),
  });
  const excApi = await getExcApi();
  const sceneData =
    data ??
    serializeAsJSON(
      excApi?.getSceneElements() ?? [],
      excApi?.getAppState(),
      excApi?.getFiles() ?? {},
      "database"
    );
  await saveScene(path, sceneData);
  return path;
};

const saveCurrentScene = async () => {
  if (!hasInit) return;
  if (isUntitledScene() || isUpToDate()) return;
  const excApi = await getExcApi();
  const sceneData = serializeAsJSON(
    excApi?.getSceneElements() ?? [],
    excApi?.getAppState(),
    excApi?.getFiles() ?? {},
    "database"
  );
  await saveScene(activeScene.value, sceneData);
};
const saveScene = async (path: string | URL, data: string) => {
  await writeTextFile(
    path,
    data.replace('"source": "http://localhost:1420"', '"source": "Lokidraw"')
  );
  setSaved();
  activeScene.value = path.toString();
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
const loadScene = async (path: string | URL | null) => {
  if (path == null) return;
  try {
    console.log("loading", await removeHomePath(path));
    const sceneData = JSON.parse(await readTextFile(path));
    console.log(sceneData);
    const excApi = await getExcApi();
    const restoredSceneData = restore(
      sceneData,
      excApi?.getAppState(),
      excApi?.getSceneElements()
    );
    excApi?.updateScene(restoredSceneData);
    activeScene.value = path.toString();
  } catch (e) {
    if (e instanceof Error) {
      console.error(await removeHomePath(e.message));
      return;
    }
    if (!e) return;
    console.error(await removeHomePath(e.toString()));
  }
};

const initSceneManager = async () => {
  if (hasInit) return;
  const prevScenePath = getConfig().scene;
  console.log("setting activeScene", await removeHomePath(prevScenePath));
  if ((await removeHomePath(prevScenePath)) !== DEFAULT_NAME) {
    await loadScene(prevScenePath);
  }
  const excApi = await getExcApi();
  excApi?.onChange(() => {
    console.log("drawing changed");
    setHasUnsaved();
  });
  setInterval(saveCurrentScene, 30000);
  hasInit = true;
};

export const sceneManager = {
  initSceneManager,
  saveCurrentScene,
  saveWithFilePicker,
  loadSceneWithFilePicker: loadWithFilePicker,
  newSceneWithFilePicker,
};
