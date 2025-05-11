import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import { explodePromise } from "./util/explodePromise";

const [promise, resolve] = explodePromise<ExcalidrawImperativeAPI>();

let excApi: Promise<ExcalidrawImperativeAPI> = promise;

export const setExcApi = (ex: ExcalidrawImperativeAPI) => {
  resolve(ex);
};
export const getExcApi = () => excApi;
