import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import "./App.css";
import { SideNav } from "./components/SideNav";
import { SideNavBtn } from "./components/SideNavBtn";
import { SceneTitle } from "./components/SceneTitle";
import { getAppState } from "./appState";
import { setExcApi } from "./excalidrawApi";
import { sceneManager } from "./managers/sceneManager";

sceneManager.initSceneManager();

function App() {
  const { activeScene: sceneName } = getAppState();
  return (
    <main class="lokidraw">
      <SideNav />
      <Excalidraw
        excalidrawAPI={setExcApi}
        initialData={{ appState: { name: sceneName } }}
      >
        <SideNavBtn />
        <MainMenu>
          <MainMenu.DefaultItems.LoadScene />
          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.DefaultItems.Help />
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.DefaultItems.ToggleTheme />
          <MainMenu.DefaultItems.ChangeCanvasBackground />
        </MainMenu>
        <SceneTitle />
      </Excalidraw>
    </main>
  );
}

export default App;
