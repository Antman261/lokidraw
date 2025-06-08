import { JSX } from "preact/jsx-runtime";
import { activeSceneName } from "../appState";

const wrapperStyle: JSX.CSSProperties = {
  position: "absolute",
  top: "1rem",
  left: "7rem",
  height: "40px",
  zIndex: 800,
};

export const SceneTitle = () => (
  <div style={wrapperStyle}>
    <h1 class="scene-title">{activeSceneName.value}</h1>
  </div>
);
