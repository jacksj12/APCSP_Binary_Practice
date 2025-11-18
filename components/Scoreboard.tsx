
import React from 'react';

interface ScoreboardProps {
  score: number;
  showTimer: boolean;
  timeLeft: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score, showTimer, timeLeft }) => {
  return (
    <div className="w-full flex justify-between items-center text-xl font-bold px-4 py-2 border-2 border-matrix-green rounded-lg bg-dark-code">
      <div>
        <span>SCORE: </span>
        <span className="text-white">{score}</span>
      </div>
      {showTimer && (
        <div>
          <span>TIME: </span>
          <span className={timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-white'}>{timeLeft}</span>
        </div>
      )}
    </div>
  );
};

export default Scoreboard;
