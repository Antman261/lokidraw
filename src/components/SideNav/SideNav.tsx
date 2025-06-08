import './SideNav.css';
import { NavItem } from '../NavItem';
import { isNavOpen, recentScenes, theme } from '../../appState';
import { classAttr } from '../../util';

export const SideNav = () => {
  const classes = classAttr('excalidraw sidenav').add(
    isNavOpen.value ? 'open' : 'closed',
    theme.value
  );
  return (
    <nav class={classes()}>
      {[...recentScenes.value].map((scene) => (
        <NavItem scene={scene} />
      ))}
    </nav>
  );
};
