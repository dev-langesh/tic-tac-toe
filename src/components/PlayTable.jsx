import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerProvider";
import { symbols } from "../config";

export default function PlayTable({ dimension, players, winningLength }) {
  const [state, setState] = useState(
    Array(dimension).fill(Array(dimension).fill(null))
  );

  const playerContext = useContext(PlayerContext);
  const {
    currentPlayer,
    winner,
    setWinner,
    reset,
    setReset,
    setCurrentPlayer,
  } = useContext(PlayerContext);

  useEffect(() => {
    if (reset) {
      setState(Array(dimension).fill(Array(dimension).fill(null)));
      setReset(false);
      setCurrentPlayer(0);
      setWinner(null);
    }
  }, [playerContext]);

  function isWinningMove(row, col, player) {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ];

    for (const [dx, dy] of directions) {
      let count = 1;

      let nextRow = row + dx;
      let nextCol = col + dy;
      while (
        nextRow >= 0 &&
        nextRow < dimension &&
        nextCol >= 0 &&
        nextCol < dimension &&
        state[nextRow][nextCol] === player
      ) {
        count++;
        nextRow += dx;
        nextCol += dy;
      }

      nextRow = row - dx;
      nextCol = col - dy;
      while (
        nextRow >= 0 &&
        nextRow < dimension &&
        nextCol >= 0 &&
        nextCol < dimension &&
        state[nextRow][nextCol] === player
      ) {
        count++;
        nextRow -= dx;
        nextCol -= dy;
      }

      if (count >= winningLength) {
        return true;
      }
    }

    return false;
  }

  function handleClick(rowIndex, cellIndex) {
    setState((prev) => {
      if (prev[rowIndex][cellIndex] === null && !winner) {
        const newState = prev.map((row) => row.slice());
        newState[rowIndex][cellIndex] = currentPlayer;

        if (isWinningMove(rowIndex, cellIndex, currentPlayer)) {
          setWinner(currentPlayer);
        }

        return newState;
      }

      return prev;
    });

    setCurrentPlayer((prev) => (prev + 1) % players);
  }

  return (
    <div className=" flex-shrink-0">
      <table className="border-collapse border border-gray-800 ">
        <tbody>
          {state.map((row, rowIndex) => (
            <tr key={`r-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`c-${cellIndex}`}
                  onClick={() => handleClick(rowIndex, cellIndex)}
                  className={`border border-gray-800 ${
                    dimension <= 5 && "md:w-20 md:h-20"
                  } w-14  h-14 text-center text-slate-500 font-[500] text-lg md:text-2xl cursor-pointer hover:bg-blue-50`}
                >
                  {cell !== null ? symbols[cell] : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
