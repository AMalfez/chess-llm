import { AVAILABLE_MODELS } from '../types/chess';

interface GameControlsProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  onNewGame: () => void;
  onUndoMove: () => void;
  isPlayerTurn: boolean;
  canUndo: boolean;
}

export default function GameControls({
  selectedModel,
  onModelChange,
  onNewGame,
  onUndoMove,
  isPlayerTurn,
  canUndo
}: GameControlsProps) {
  return (
    <div className="game-controls">
      <div className="control-group">
        <label htmlFor="model-select">AI Model:</label>
        <select
          id="model-select"
          value={selectedModel}
          onChange={(e) => onModelChange(e.target.value)}
          className="model-select"
        >
          {AVAILABLE_MODELS.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>

      <div className="control-buttons">
        <button onClick={onNewGame} className="btn btn-primary">
          New Game
        </button>
        <button
          onClick={onUndoMove}
          disabled={!canUndo || !isPlayerTurn}
          className="btn btn-secondary"
        >
          Undo Move
        </button>
      </div>
    </div>
  );
}
