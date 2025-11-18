import React, { useState } from 'react';
import { GameMode, Difficulty } from '../types';

interface StartScreenProps {
  onStart: (mode: GameMode, difficulty: Difficulty) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Hard);

  return (
    <div className="text-center w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Choose Difficulty</h2>
      <div className="flex justify-center gap-4 mb-8 w-full max-w-lg">
        {Object.values(Difficulty).map((level) => {
          const isSelected = difficulty === level;
          return (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              className={`flex-1 p-2 border-2 rounded-lg transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-matrix-green
                ${isSelected 
                  ? 'bg-matrix-green text-dark-code shadow-matrix' 
                  : 'bg-dark-code border-matrix-green hover:bg-matrix-green hover:text-dark-code'
                }`}
            >
              <h3 className="font-bold text-md capitalize">{level}</h3>
            </button>
          );
        })}
      </div>

      <h2 className="text-2xl font-bold mb-6">Choose Your Challenge</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg">
        <button
          onClick={() => onStart(GameMode.DecimalToBinary, difficulty)}
          className="p-4 bg-dark-code border-2 border-matrix-green rounded-lg hover:bg-matrix-green hover:text-dark-code transition-all duration-300 shadow-md hover:shadow-matrix focus:outline-none focus:ring-2 focus:ring-matrix-green"
        >
          <h3 className="font-bold text-lg">Decimal to Binary</h3>
          <p className="text-sm text-neutral-400">Convert numbers to binary.</p>
        </button>
        <button
          onClick={() => onStart(GameMode.BinaryToDecimal, difficulty)}
          className="p-4 bg-dark-code border-2 border-matrix-green rounded-lg hover:bg-matrix-green hover:text-dark-code transition-all duration-300 shadow-md hover:shadow-matrix focus:outline-none focus:ring-2 focus:ring-matrix-green"
        >
          <h3 className="font-bold text-lg">Binary to Decimal</h3>
          <p className="text-sm text-neutral-400">Convert binary to numbers.</p>
        </button>
        <button
          onClick={() => onStart(GameMode.TimedChallenge, difficulty)}
          className="p-4 bg-dark-code border-2 border-matrix-green rounded-lg hover:bg-matrix-green hover:text-dark-code transition-all duration-300 shadow-md hover:shadow-matrix focus:outline-none focus:ring-2 focus:ring-matrix-green"
        >
          <h3 className="font-bold text-lg">Timed Challenge</h3>
          <p className="text-sm text-neutral-400">60 seconds, mixed questions.</p>
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
