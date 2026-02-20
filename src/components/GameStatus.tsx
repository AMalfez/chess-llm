interface GameStatusProps {
  isGameOver: boolean;
  result: string | null;
  turn: 'w' | 'b';
  isAIThinking: boolean;
}

export default function GameStatus({ isGameOver, result, turn, isAIThinking }: GameStatusProps) {
  return (
    <div className="game-status">
      {isGameOver ? (
        <div className="game-over">
          <h2>Game Over</h2>
          <p>{result}</p>
        </div>
      ) : (
        <div className="current-turn">
          <h3>
            {isAIThinking ? (
              <span className="ai-thinking">AI is thinking...</span>
            ) : (
              <>
                {turn === 'w' ? 'White' : 'Black'} to move
              </>
            )}
          </h3>
        </div>
      )}
    </div>
  );
}
