import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import "./App.css";
import { SceneTitle } from "./components/SceneTitle";
import { setExcaliApi } from "./excalidrawApi";
import { LokiMenuRoot } from "./managers/menuTypes";
import { menuManager } from "./managers/menuManager";
import { initLokidraw } from "./init";
import { delay } from "./util/delay";

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

delay(5).then(initLokidraw);
function App() {
  console.log("hello?");
  return (
    <main class="lokidraw">
      <Excalidraw excalidrawAPI={setExcaliApi}>
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
  );
}

export default App;
