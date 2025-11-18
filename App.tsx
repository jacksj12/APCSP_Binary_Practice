import React, { useState, useCallback, useEffect } from 'react';
import { GameMode, GameState, Difficulty, HighScore } from './types';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';

const HIGH_SCORES_KEY = 'binaryBlasterHighScores';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.DecimalToBinary);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Hard);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  useEffect(() => {
    try {
      const savedScores = localStorage.getItem(HIGH_SCORES_KEY);
      if (savedScores) {
        setHighScores(JSON.parse(savedScores));
      }
    } catch (e) {
      console.error("Failed to load high scores", e);
    }
  }, []);

  const handleStartGame = (mode: GameMode, selectedDifficulty: Difficulty) => {
    setGameMode(mode);
    setDifficulty(selectedDifficulty);
    setScore(0);
    setIsNewHighScore(false);
    if (mode === GameMode.TimedChallenge) {
      setTimeLeft(60);
    }
    setGameState(GameState.Playing);
  };

  const handleGameEnd = useCallback(() => {
    if (score > 0) {
      const lowestHighScore = highScores.length === 3 ? highScores[2].score : 0;
      if (highScores.length < 3 || score > lowestHighScore) {
        const newEntry: HighScore = { score, date: new Date().toLocaleDateString() };
        const updatedScores = [...highScores, newEntry]
          .sort((a, b) => b.score - a.score)
          .slice(0, 3);
        
        setHighScores(updatedScores);
        setIsNewHighScore(true);
        try {
          localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(updatedScores));
        } catch (e) {
          console.error("Failed to save high scores", e);
        }
      }
    }
    setGameState(GameState.End);
  }, [score, highScores]);

  const handleRestart = () => {
    setGameState(GameState.Start);
    setScore(0);
    setIsNewHighScore(false);
  };

  const handleScoreUpdate = useCallback(() => {
    setScore(prev => prev + 1);
  }, []);
  
  useEffect(() => {
    if (gameState === GameState.Playing && gameMode === GameMode.TimedChallenge) {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else if (timeLeft === 0) {
        handleGameEnd();
      }
    }
  }, [gameState, gameMode, timeLeft, handleGameEnd]);

  const renderContent = () => {
    switch (gameState) {
      case GameState.Playing:
        return (
          <GameScreen
            mode={gameMode}
            difficulty={difficulty}
            onScoreUpdate={handleScoreUpdate}
            onGameEnd={handleGameEnd}
            score={score}
            timeLeft={timeLeft}
          />
        );
      case GameState.End:
        return <EndScreen 
                  score={score} 
                  onRestart={handleRestart} 
                  highScores={highScores}
                  isNewHighScore={isNewHighScore}
                />;
      case GameState.Start:
      default:
        return <StartScreen onStart={handleStartGame} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-matrix-green filter drop-shadow-[0_0_5px_#00ff41]">
            BINARY BLASTER
          </h1>
          <p className="text-neutral-400 mt-2">APCSP Binary Practice</p>
        </header>
        <main className="bg-light-code border-2 border-matrix-green rounded-lg shadow-matrix p-6 min-h-[400px] flex items-center justify-center">
          {renderContent()}
        </main>
        <footer className="text-center mt-8 text-neutral-500 text-sm">
            <p>Master 4, 6, and 8-bit conversions for AP Computer Science Principles.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
