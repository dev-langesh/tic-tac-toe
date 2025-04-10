import React, { useEffect, useState } from "react";

const symbols = ["X", "O", "Y"];

export default function PlayTable({ dimension, players, winningLength }) {
  const [state, setState] = useState(
    Array(dimension).fill(Array(dimension).fill(null))
  );
  const [winner, setWinner] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(0);

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

  useEffect(() => {
    if (winner !== null) {
      alert(`Player ${winner} wins!`);
      setState(Array(dimension).fill(Array(dimension).fill(null)));
      setWinner(null);
    }
  }, [winner]);

  return (
    <div className="">
      <table className="border-collapse border border-gray-800">
        <tbody>
          {state.map((row, rowIndex) => (
            <tr key={`r-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`c-${cellIndex}`}
                  onClick={() => handleClick(rowIndex, cellIndex)}
                  className="border border-gray-800 w-10 h-10 text-center"
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
