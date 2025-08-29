import { homeDir } from '@tauri-apps/api/path';

/**
 * Extract the scene name from a filepath
 */
export const toSceneName = (path: string) =>
  path.split('/').at(-1)!.split('.')[0];

/**
 * Extract the directory from a filepath
 */
export const toSceneDir = (path: string) =>
  path.split('/').slice(0, -1).join('/');

let homeDirPath = '';
/**
 * Looks up the user's home directory and saves it to homeDirPath
 *
 * Required before calling removeHomePath
 */
export const initHomeDirPath = async () => (homeDirPath = await homeDir());

/**
 * Replace the home directory with the ~ shorthand
 */
export const removeHomePath = (path: string | URL) =>
  path.toString().replace(homeDirPath, '~');
