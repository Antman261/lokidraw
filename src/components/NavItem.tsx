import { JSX } from "preact/compat";
import { getAppState, SceneMeta } from "../appState";
import { sceneManager } from "../managers/sceneManager";

type Props = {
  scene: SceneMeta;
};

const loadScene = (name: string) => () => sceneManager.loadScene(name);

export const NavItem = ({ scene }: Props): JSX.Element => {
  const { activeScene } = getAppState();
  const classes = ["nav-item"];
  scene.name === activeScene && classes.push("active");
  return (
    <a href="#" class={classes.join(" ")} onClick={loadScene(scene.name)}>
      <div class={"name"}>{scene.name}</div>
      <div class={"time"}>{scene.updatedAt.toLocaleString()}</div>
    </a>
  );
};
