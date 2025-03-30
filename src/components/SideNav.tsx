import { getAppState } from "../appState";
import { NavItem } from "./NavItem";

export const SideNav = () => {
  const { isNavOpen, scenes } = getAppState();
  const classes = ["excalidraw", "sidenav"];
  classes.push(isNavOpen ? "open" : "closed");
  return (
    <nav class={classes.join(" ")}>
      {scenes.map((scene) => (
        <NavItem scene={scene} />
      ))}
    </nav>
  );
};
