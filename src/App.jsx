import { useState } from "react";
import PlayTable from "./components/PlayTable";
import Players from "./components/Players";
import PlayerProvider from "./context/PlayerProvider";

function App() {
  return (
    <PlayerProvider>
      <main className="flex items-center justify-center h-screen bg-blue-500 p-4">
        <div className="flex max-sm:flex-col max-sm:items-center gap-10 p-8 bg-white rounded-xl shadow-lg w-full md:w-[750px]">
          <PlayTable dimension={5} players={3} winningLength={4} />
          <Players />
        </div>
      </main>
    </PlayerProvider>
  );
}

export default App;
