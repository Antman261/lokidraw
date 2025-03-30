import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";

let excApi: ExcalidrawImperativeAPI | undefined;

export const setExcApi = (ex: ExcalidrawImperativeAPI) => (excApi = ex);
export const getExcApi = () => excApi;
