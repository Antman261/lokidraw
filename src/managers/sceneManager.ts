import {
  writeTextFile,
  readTextFile,
  BaseDirectory,
  mkdir,
  readDir,
  stat,
} from "@tauri-apps/plugin-fs";
import { getExcApi } from "../excalidrawApi";
import { getConfig } from "./configManager";
import {
  getAppState,
  SceneMeta,
  setHasUnsaved,
  setSaved,
  setSceneName,
  setScenes,
} from "../appState";
import { restore, serializeAsJSON } from "@excalidraw/excalidraw";
import { DEFAULT_NAME } from "../constants";

const LOKI_DIR = "Lokidraw/";
const baseDir = {
  baseDir: BaseDirectory.Home,
};
const toScenePath = (name: string) => `Lokidraw/${name}.lkd`;

let hasInit = false;
const makeLokidrawDir = async () => {
  try {
    await mkdir(LOKI_DIR, baseDir);
  } catch (error) {
    console.log(error);
  }
};

const loadPreviousScene = async () => {
  const { activeScene } = getConfig();
  if (activeScene === DEFAULT_NAME) return;
  if (activeScene) await loadScene(activeScene);
};

const loadScene = async (sceneName: string) => {
  console.log("loading scene", sceneName);
  if (sceneName === DEFAULT_NAME) return;
  const text = await readTextFile(toScenePath(sceneName), baseDir);
  const sceneData = JSON.parse(text);
  const excApi = getExcApi();
  const restoredSceneData = restore(
    sceneData,
    excApi?.getAppState(),
    excApi?.getSceneElements()
  );
  excApi?.updateScene(restoredSceneData);
  setSceneName(sceneName);
  console.log(`Loaded scene:`, sceneName);
};

const saveScene = async () => {
  if (!hasInit) return;
  const { activeScene, hasUnsaved } = getAppState();
  const isUntitledScene = activeScene === DEFAULT_NAME;
  const isSaved = hasUnsaved === false;
  if (isUntitledScene || isSaved) return;

  const excApi = getExcApi();
  const sceneData = serializeAsJSON(
    excApi?.getSceneElements() ?? [],
    excApi?.getAppState(),
    excApi?.getFiles() ?? {},
    "database"
  );

  await writeTextFile(toScenePath(activeScene), sceneData, baseDir);
  setSceneName(activeScene);
  setSaved();
};

const loadSceneList = async () => {
  console.log("loading scenes");
  const files = await readDir(LOKI_DIR, baseDir);
  const scenes: SceneMeta[] = [];
  for await (const f of files) {
    const name = f.name.split("/").at(-1)?.replace(".lkd", "")!;
    const updatedAt = (await stat(`${LOKI_DIR}${f.name}`, baseDir)).atime!;
    scenes.push({ name, updatedAt });
  }
  console.log({ scenes });
  setScenes(scenes);
};

const initSceneManager = async () => {
  const excApi = getExcApi();
  await makeLokidrawDir();
  await loadPreviousScene();
  setSaved();
  excApi?.onChange(setHasUnsaved);
  await loadSceneList();
  setInterval(saveScene, 3000);
  hasInit = true;
};

export const sceneManager = {
  initSceneManager,
  saveScene,
  loadScene,
  loadPreviousScene,
};
