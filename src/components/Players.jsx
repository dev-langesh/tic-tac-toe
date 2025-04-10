import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerProvider";
import { symbols } from "../config";

export default function Players() {
  const { playerNames, currentPlayer, winner } = useContext(PlayerContext);

  return (
    <div className="w-full flex flex-col justify-between">
      <div>
        <h1 className="text-center text-2xl font-semibold text-slate-700">
          Players
        </h1>
        <ul className="pt-3">
          {playerNames.map((name, index) => (
            <li
              key={index}
              className={`text-lg ${
                currentPlayer === index ? "text-blue-500" : "text-slate-500"
              } flex items-center gap-6 font-[500]`}
            >
              <span>{name}</span> <span>{symbols[index]}</span>
            </li>
          ))}
        </ul>
      </div>{" "}
      <div>
        {winner && (
          <>
            <h1 className="text-center text-2xl font-semibold text-green-700">
              Winner
            </h1>
          </>
        )}
      </div>
    </div>
  );
}
