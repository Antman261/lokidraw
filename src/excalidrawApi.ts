import { ExcalidrawImperativeAPI as ExcaliApi } from '@excalidraw/excalidraw/types';
import { explodePromise } from './util/explodePromise';
import { restore, serializeAsJSON } from '@excalidraw/excalidraw';
import { delay } from './util/delay';

const [excaliApi, resolve] = explodePromise<ExcaliApi>();

export const setExcApi = async (ex: ExcaliApi) =>
  delay(0).then(() => resolve(ex));
export const getExcali = () => excaliApi;

export const getActiveSceneData = async () => {
  const exc = await getExcali();
  return serializeAsJSON(
    exc.getSceneElements(),
    exc.getAppState(),
    exc.getFiles(),
    'database'
  );
};

export const restoreScene = async (rawData: string) => {
  const excApi = await getExcali();
  const sceneData = JSON.parse(rawData);
  const restoredScene = restore(sceneData, excApi.getAppState(), null);
  excApi.updateScene(restoredScene);
  // console.log(sceneData.elements, restoredScene.elements);
};
