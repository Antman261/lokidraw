import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import { explodePromise } from "./util/explodePromise";
import { restore, serializeAsJSON } from "@excalidraw/excalidraw";

const [excaliApi, resolve] = explodePromise<ExcalidrawImperativeAPI>();

export const setExcaliApi = (ex: ExcalidrawImperativeAPI) => resolve(ex);
export const getExcali = () => excaliApi;

export const getActiveSceneData = async () => {
  const exc = await getExcali();
  return serializeAsJSON(
    exc.getSceneElements(),
    exc.getAppState(),
    exc.getFiles(),
    "database"
  );
};

export const restoreScene = async (rawData: string) => {
  const sceneData = JSON.parse(rawData);
  const restoredScene = restore(
    sceneData,
    sceneData.appState,
    sceneData.elements
  );
  (await getExcali()).updateScene(restoredScene);
  console.log(sceneData.elements, restoredScene.elements);
};
