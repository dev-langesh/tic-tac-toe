import PlayTable from "./components/PlayTable";
import Players from "./components/Players";
import PlayerProvider from "./context/PlayerProvider";

function App() {
  return (
    <PlayerProvider>
      <main className="flex items-center justify-center h-screen bg-blue-600 p-4">
        <div>
          <h1 className="text-3xl  font-bold text-white text-center pb-4">
            Tic Tac Toe
          </h1>
          <div className="flex max-sm:flex-col max-sm:items-center gap-10 p-8 bg-white rounded-xl shadow-lg w-full md:w-auto">
            <PlayTable dimension={5} players={3} winningLength={4} />
            <Players />
          </div>
        </div>
      </main>
    </PlayerProvider>
  );
}

export default App;
