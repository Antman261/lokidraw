import { JSX } from "preact/jsx-runtime";
import { getAppState, setSceneName } from "../appState";
import { useRef } from "preact/hooks";
import { blurOnEnterKey } from "../util/blurOnEnterKey";

const wrapperStyle: JSX.CSSProperties = {
  position: "absolute",
  top: "1rem",
  left: "7rem",
  height: "40px",
  zIndex: 800,
};

export const SceneTitle = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { activeScene: sceneName } = getAppState();
  return (
    <div style={wrapperStyle}>
      <input
        ref={ref}
        spellcheck={false}
        autocomplete="off"
        title="Click to rename scene"
        type="text"
        value={sceneName}
        class="scene-title"
        onBlur={(e) => setSceneName(e.currentTarget.value)}
        onKeyDown={blurOnEnterKey(ref)}
      />
    </div>
  );
};
