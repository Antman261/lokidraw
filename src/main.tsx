// @ts-expect-error https://docs.excalidraw.com/docs/@excalidraw/excalidraw/api/utils
window.EXCALIDRAW_EXPORT_SOURCE = "Lokidraw";
// @ts-expect-error https://docs.excalidraw.com/docs/@excalidraw/excalidraw/api/utils
globalThis.EXCALIDRAW_EXPORT_SOURCE = "Lokidraw";
import { render } from "preact";
import App from "./App";

console.log(window);

render(<App />, document.getElementById("root")!);
