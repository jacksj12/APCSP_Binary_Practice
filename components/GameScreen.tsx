import React, { useState, useEffect, useCallback } from 'react';
import { GameMode, Difficulty } from '../types';
import { decimalToBinary, binaryToDecimal, generateRandomNumber } from '../utils/binary';
import BinaryInput from './BinaryInput';
import Scoreboard from './Scoreboard';

interface GameScreenProps {
  mode: GameMode;
  difficulty: Difficulty;
  onScoreUpdate: () => void;
  onGameEnd: () => void;
  score: number;
  timeLeft: number;
}

const GameScreen: React.FC<GameScreenProps> = ({ mode, difficulty, onScoreUpdate, onGameEnd, score, timeLeft }) => {
  const [currentMode, setCurrentMode] = useState<GameMode.DecimalToBinary | GameMode.BinaryToDecimal>(
    mode === GameMode.TimedChallenge ? GameMode.DecimalToBinary : mode
  );
  const [question, setQuestion] = useState<string | number>('');
  const [binaryAnswer, setBinaryAnswer] = useState('00000000');
  const [decimalAnswer, setDecimalAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);
  const [isAnswering, setIsAnswering] = useState(true);

  const getBitsForDifficulty = (level: Difficulty): number => {
    switch (level) {
      case Difficulty.Easy: return 4;
      case Difficulty.Medium: return 6;
      case Difficulty.Hard: return 8;
      default: return 8;
    }
  };

  const bits = getBitsForDifficulty(difficulty);

  const generateNewQuestion = useCallback(() => {
    setIsAnswering(true);
    setFeedback(null);
    setBinaryAnswer('0'.repeat(bits));
    setDecimalAnswer('');

    let nextMode = mode;
    if (mode === GameMode.TimedChallenge) {
      nextMode = Math.random() < 0.5 ? GameMode.DecimalToBinary : GameMode.BinaryToDecimal;
    }
    
    const num = generateRandomNumber(bits);
    if (nextMode === GameMode.DecimalToBinary) {
      setCurrentMode(GameMode.DecimalToBinary);
      setQuestion(num);
    } else {
      setCurrentMode(GameMode.BinaryToDecimal);
      setQuestion(decimalToBinary(num, bits));
    }
  }, [mode, bits]);

  useEffect(() => {
    generateNewQuestion();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAnswering) return;

    let isCorrect = false;
    if (currentMode === GameMode.DecimalToBinary) {
      isCorrect = binaryToDecimal(binaryAnswer) === (question as number);
    } else {
      isCorrect = parseInt(decimalAnswer) === binaryToDecimal(question as string);
    }

    setIsAnswering(false);
    if (isCorrect) {
      setFeedback({ message: 'Correct!', isCorrect: true });
      onScoreUpdate();
    } else {
      const correctAnswer = currentMode === GameMode.DecimalToBinary 
        ? decimalToBinary(question as number, bits) 
        : binaryToDecimal(question as string);
      setFeedback({ message: `Incorrect! Answer: ${correctAnswer}`, isCorrect: false });
    }

    setTimeout(generateNewQuestion, 1500);
  };

  const renderQuestion = () => (
    <div className="text-center">
      <p className="text-lg mb-2 text-neutral-400">
        {currentMode === GameMode.DecimalToBinary ? 'Convert to Binary:' : 'Convert to Decimal:'}
      </p>
      <p className="text-5xl font-bold tracking-widest">{question}</p>
    </div>
  );

  const renderAnswerInput = () => {
    if (currentMode === GameMode.DecimalToBinary) {
      return <BinaryInput value={binaryAnswer} onChange={setBinaryAnswer} disabled={!isAnswering} bits={bits} />;
    } else {
      return (
        <input
          type="number"
          value={decimalAnswer}
          onChange={(e) => setDecimalAnswer(e.target.value)}
          disabled={!isAnswering}
          className="w-48 text-center bg-dark-code border-2 border-matrix-green rounded-md p-2 text-3xl focus:outline-none focus:ring-2 focus:ring-matrix-green"
          autoFocus
        />
      );
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <Scoreboard score={score} showTimer={mode === GameMode.TimedChallenge} timeLeft={timeLeft} />
      <div className="my-8 min-h-[100px] flex items-center justify-center">
        {feedback ? (
          <p className={`text-3xl font-bold ${feedback.isCorrect ? 'text-matrix-green' : 'text-red-500'}`}>
            {feedback.message}
          </p>
        ) : (
          renderQuestion()
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
        {renderAnswerInput()}
        <button
          type="submit"
          disabled={!isAnswering}
          className="w-48 px-6 py-2 text-lg font-bold bg-matrix-green text-dark-code rounded-md hover:bg-opacity-80 transition-all duration-300 disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default GameScreen;
