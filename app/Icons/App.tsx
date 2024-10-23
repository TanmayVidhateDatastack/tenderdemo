import "./App.css";
import Pane from "../Components/DsPane/DsPane";

function App() {
  return (
    <>
      <Pane type="ClosePane" side="right"></Pane>
      <Pane type="ClosePane" side="left"></Pane>
    </>
  );
}

export default App;
