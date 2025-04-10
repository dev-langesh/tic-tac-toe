import { useState } from "react";
import PlayTable from "./components/PlayTable";

function App() {
  return (
    <main>
      <PlayTable dimension={3} players={2} winningLength={3} />
    </main>
  );
}

export default App;
