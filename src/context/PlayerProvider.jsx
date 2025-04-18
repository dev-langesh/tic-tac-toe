import React, { createContext, useState } from "react";

export const PlayerContext = createContext();

export default function PlayerProvider({ children }) {
  const [playerNames, setPlayerNames] = useState([
    "Player 1",
    "Player 2",
    "Player 3",
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [winner, setWinner] = useState(null);
  const [reset, setReset] = useState(false);

  return (
    <PlayerContext.Provider
      value={{
        currentPlayer,
        setCurrentPlayer,
        playerNames,
        setPlayerNames,
        winner,
        setWinner,
        reset,
        setReset,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
