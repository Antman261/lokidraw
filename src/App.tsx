import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import "./App.css";
import { SceneTitle } from "./components/SceneTitle";
import { activeSceneName } from "./appState";
import { setExcApi } from "./excalidrawApi";
import { sceneManager } from "./managers/sceneManager";
import { menuManager } from "./managers/menuManager";
sceneManager.initSceneManager();
(await menuManager).initMenuManager();

function App() {
  return (
    <main class="lokidraw">
      <Excalidraw
        excalidrawAPI={setExcApi}
        initialData={{ appState: { name: activeSceneName } }}
      >
        <MainMenu>
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
