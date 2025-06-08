import { theme } from '../appState';
import './TitleBar.css';

export const TitleBar = () => (
  <nav data-tauri-drag-region class={`top-nav ${theme}`} />
);
