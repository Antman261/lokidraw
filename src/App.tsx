import { Excalidraw, MainMenu } from '@excalidraw/excalidraw';
import './App.css';
import { SceneTitle } from './components/SceneTitle';
import { setExcApi } from './excalidrawApi';
import { LokiMenuRoot } from './managers/menuTypes';
import { menuManager } from './managers/menuManager';
import { initLokidraw } from './init';
import { SideNavBtn } from './components/SideNav/SideNavBtn';
import { SideNav } from './components/SideNav/SideNav';
import { TitleBar } from './components/TitleBar';
import { theme } from './appState';
import { config } from './managers';

const toExcaliMenu = (root: LokiMenuRoot) => (
  <>
    {root.slice(1).map((menu) => (
      <MainMenu.Group title={menu.text}>
        {menu.items.map((item) => (
          <MainMenu.Item onClick={item.action} icon={item.icon}>
            {item.text}
          </MainMenu.Item>
        ))}
      </MainMenu.Group>
    ))}
  </>
);

initLokidraw();
function App() {
  return (
    <>
      <TitleBar />
      <main class={`lokidraw ${theme}`}>
        <SideNav />
        <Excalidraw
          excalidrawAPI={setExcApi}
          initialData={{ elements: [], appState: { theme: config.theme } }}
        >
          <SideNavBtn />
          <MainMenu>
            {toExcaliMenu(menuManager.getRootMenu())}
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.Help />
            <MainMenu.DefaultItems.ToggleTheme />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu>
          <SceneTitle />
        </Excalidraw>
      </main>
    </>
  );
}

export default App;
