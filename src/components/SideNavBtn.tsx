import SidebarIcon from "../assets/sidebarIcon.svg";
import { JSX } from "preact";
import { getAppState, toggleSideNav } from "../appState";

const wrapperStyle: JSX.CSSProperties = {
  position: "absolute",
  top: "1rem",
  left: "1rem",
  zIndex: 800,
};
const btnStyle = `--button-bg: var(--color-surface-low); --button-width: var(--lg-button-size); --button-height: var(--lg-button-size); --box-shadow-normal: var(--color-surface-lowest); --box-shadow-active: var(--color-brand-active);`;

export const SideNavBtn = () => {
  const { isNavOpen } = getAppState();
  return (
    <div style={wrapperStyle}>
      <button
        class="excalidraw-button sidenav-btn"
        style={btnStyle}
        onClick={toggleSideNav}
      >
        <img
          src={SidebarIcon}
          style={isNavOpen ? "" : "transform: scale(-1, 1)"}
        />
      </button>
    </div>
  );
};
