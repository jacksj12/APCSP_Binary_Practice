import React from 'react';
import { HighScore } from '../types';

interface EndScreenProps {
  score: number;
  onRestart: () => void;
  highScores: HighScore[];
  isNewHighScore: boolean;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, onRestart, highScores, isNewHighScore }) => {
  return (
    <div className="text-center flex flex-col items-center w-full">
      <h2 className="text-3xl font-bold mb-4">Challenge Over!</h2>
      <p className="text-xl mb-6">
        Your final score is: <span className="text-5xl font-bold block mt-2">{score}</span>
      </p>
      {isNewHighScore && (
        <p className="text-2xl text-yellow-400 animate-pulse mb-6">New High Score!</p>
      )}

      <div className="w-full max-w-sm mb-8">
        <h3 className="text-2xl font-bold mb-4 border-b-2 border-matrix-green pb-2">High Scores</h3>
        {highScores.length > 0 ? (
          <ul className="space-y-2 text-lg">
            {highScores.map((hs, index) => (
              <li key={index} className="flex justify-between items-center bg-dark-code p-2 rounded">
                <span>{index + 1}. {hs.score}</span>
                <span className="text-sm text-neutral-400">{hs.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-neutral-400">No high scores yet. Be the first!</p>
        )}
      </div>

      <button
        onClick={onRestart}
        className="px-8 py-3 text-xl font-bold bg-matrix-green text-dark-code rounded-md hover:bg-opacity-80 transition-all duration-300 shadow-lg hover:shadow-matrix"
      >
        Play Again
      </button>
    </div>
  );
};

export default EndScreen;
