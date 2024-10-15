import "./App.css";
import Pane from "./Panes/Pane";

function App() {
  return (
    <>
      <Pane type="ClosePane" side="right"></Pane>
      <Pane type="ClosePane" side="left"></Pane>
    </>
  );
}

export default App;
