import { render } from "preact";
import App from "./App";

// @ts-expect-error https://docs.excalidraw.com/docs/@excalidraw/excalidraw/api/utils
window.EXCALIDRAW_EXPORT_SOURCE = "Lokidraw";

render(<App />, document.getElementById("root")!);
