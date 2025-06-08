import { JSX } from "preact/compat";
import { activeScene } from "../appState";
import { toSceneName } from "../util/path";
import { classAttr } from "../util/HtmlClass";

type Props = { scene: string };

const loadScene = (path: string) => () => {
  activeScene.value = path;
};

export const NavItem = ({ scene }: Props): JSX.Element => {
  const classes = classAttr("nav-item");
  if (scene === activeScene.value) classes.push("active");
  return (
    <a href="#" class={classes()} onClick={loadScene(scene)}>
      <div class="name">{toSceneName(scene)}</div>
      {/* <div class={"time"}>{scene.updatedAt.toLocaleString()}</div> */}
    </a>
  );
};
