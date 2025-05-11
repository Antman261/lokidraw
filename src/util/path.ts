import { homeDir } from "@tauri-apps/api/path";

export const convertPathToScene = (path: string | URL) =>
  path instanceof URL ? path.pathname : path.split("/").at(-1)!.split(".")[0];
export const removeHomePath = async (path: string | URL) =>
  path.toString().replace(await homeDir(), "~");
