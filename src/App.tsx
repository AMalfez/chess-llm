import { useState, useEffect } from 'react';
import { Chess, type Square } from 'chess.js';
import ChessBoard from './components/ChessBoard';
import GameControls from './components/GameControls';
// import MoveHistory from './components/MoveHistory';
import GameStatus from './components/GameStatus';
import { AVAILABLE_MODELS } from './types/chess';
import { Analytics } from '@vercel/analytics/react';
import { getAIMove } from './services/llmService';
import './App.css';

function App() {
  const [game, setGame] = useState(new Chess());
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0].id);
  const [playerColor] = useState<'white' | 'black'>('white');
  const [isAIThinking, setIsAIThinking] = useState(false);

  useEffect(() => {
    if (game.turn() !== playerColor[0] && !game.isGameOver() && !isAIThinking) {
      makeAIMove();
    }
  }, [game, playerColor, isAIThinking]);

  const makeAIMove = async () => {
    setIsAIThinking(true);
    try {
      const move = await getAIMove(game, selectedModel);
      const newGame = new Chess(game.fen());
      newGame.move(move);
      setGame(newGame);
    } catch (error) {
      console.error('Error making AI move:', error);
    } finally {
      setIsAIThinking(false);
    }
  };

  const handleMove = (from: Square, to: Square) => {
    if (game.turn() !== playerColor[0] || isAIThinking) return;

    const newGame = new Chess(game.fen());
    try {
      newGame.move({ from, to, promotion: 'q' });
      setGame(newGame);
    } catch (error) {
      console.error('Invalid move:', error);
    }
  };

  const handleNewGame = () => {
    setGame(new Chess());
    setIsAIThinking(false);
  };

  const handleUndoMove = () => {
    if (game.history().length < 2) return;

    const newGame = new Chess();
    const history = game.history();

    for (let i = 0; i < history.length - 2; i++) {
      newGame.move(history[i]);
    }

    setGame(newGame);
  };

  const getGameResult = () => {
    if (game.isCheckmate()) {
      return game.turn() === 'w' ? 'Black wins by checkmate!' : 'White wins by checkmate!';
    }
    if (game.isDraw()) {
      return 'Game drawn!';
    }
    if (game.isStalemate()) {
      return 'Stalemate!';
    }
    if (game.isThreefoldRepetition()) {
      return 'Draw by threefold repetition!';
    }
    if (game.isInsufficientMaterial()) {
      return 'Draw by insufficient material!';
    }
    return null;
  };

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>ChessLLM</h1>
          <p>Play chess against open source LLM models</p>
        </header>

        <div className="game-container">
          <div className="left-panel">
            <GameControls
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
              onNewGame={handleNewGame}
              onUndoMove={handleUndoMove}
              isPlayerTurn={game.turn() === playerColor[0]}
              canUndo={game.history().length >= 2}
            />

            <GameStatus
              isGameOver={game.isGameOver()}
              result={getGameResult()}
              turn={game.turn()}
              isAIThinking={isAIThinking}
            />

            {/* <MoveHistory moves={game.history()} /> */}
          </div>

          <div className="board-container">
            <ChessBoard
              game={game}
              onMove={handleMove}
              playerColor={playerColor}
            />
          </div>
        </div>
      </div>
      <Analytics />
    </div>
  );
}

export default App;
