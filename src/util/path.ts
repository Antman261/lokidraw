import { homeDir } from "@tauri-apps/api/path";

export const toSceneName = (path: string) =>
  path.split("/").at(-1)!.split(".")[0];

export const toSceneDir = (path: string) =>
  path.split("/").slice(0, -1).join("/");

export const removeHomePath = async (path: string | URL) =>
  path.toString().replace(await homeDir(), "~");
