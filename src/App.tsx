import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import "./App.css";
import { SceneTitle } from "./components/SceneTitle";
import { activeSceneName } from "./appState";
import { setExcApi } from "./excalidrawApi";
import { sceneManager } from "./managers/sceneManager";
import { menuManager } from "./managers/menuManager";
import { LokiMenuRoot } from "./managers/menuTypes";

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
sceneManager.initSceneManager();
const menu = await menuManager;
menu.initMenuManager();

function App() {
  return (
    <main class="lokidraw">
      <Excalidraw
        excalidrawAPI={setExcApi}
        initialData={{
          appState: { name: activeSceneName.value },
          source: "Lokidraw",
        }}
      >
        <MainMenu>
          {toExcaliMenu(menu.getRootMenu())}
          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.DefaultItems.Help />
          <MainMenu.DefaultItems.ToggleTheme />
          <MainMenu.DefaultItems.ChangeCanvasBackground />
        </MainMenu>
        <SceneTitle />
      </Excalidraw>
    </main>
  );
}

export default App;
