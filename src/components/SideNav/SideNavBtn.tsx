import SidebarIcon from '../../assets/sidebarIcon.svg';
import { JSX } from 'preact';
import { isNavOpen, theme, toggleSideNav } from '../../appState';
import { createIcon } from '../excaliIcons';

const wrapperStyle: JSX.CSSProperties = {
  position: 'absolute',
  top: '1rem',
  left: '1rem',
  zIndex: 800,
};
const btnStyle = `--button-bg: var(--color-surface-low); --button-width: var(--lg-button-size); --button-height: var(--lg-button-size); --box-shadow-normal: var(--color-surface-lowest); --box-shadow-active: var(--color-brand-active);`;

const ToggleSidebar = () =>
  createIcon(
    <path
      d="M14.807 9.249a.75.75 0 0 0-1.059-.056l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 0 0 1.004-1.115l-1.048-.942h3.546a.75.75 0 1 0 0-1.5h-3.546l1.048-.942a.75.75 0 0 0 .055-1.059ZM2 17.251A2.75 2.75 0 0 0 4.75 20h14.5A2.75 2.75 0 0 0 22 17.25V6.75A2.75 2.75 0 0 0 19.25 4H4.75A2.75 2.75 0 0 0 2 6.75v10.5Zm2.75 1.25c-.69 0-1.25-.56-1.25-1.25V6.749c0-.69.56-1.25 1.25-1.25h3.254V18.5H4.75Zm4.754 0V5.5h9.746c.69 0 1.25.56 1.25 1.25v10.5c0 .69-.56 1.25-1.25 1.25H9.504Z"
      fill="currentColor"
    />,
    {
      style: {
        transform: isNavOpen.value ? 'scale(-1, 1)' : 'none',
        color:
          theme.value === 'light'
            ? 'var(--button-hover-color, var(--button-color, var(--text-primary-color, inherit)))'
            : 'var(--button-color, var(--color-on-surface))',
      },
      class: '!flex-auto Icon',
      viewBox: '0 0 24 24',
    }
  );

export const SideNavBtn = () => (
  <div style={wrapperStyle}>
    <button
      class={`excalidraw-button sidenav-btn ${theme}`}
      style={btnStyle}
      onClick={toggleSideNav}
    >
      <ToggleSidebar />
    </button>
  </div>
);
