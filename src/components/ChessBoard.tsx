import { useState } from 'react';
import { Chess, type Square } from 'chess.js';

interface ChessBoardProps {
  game: Chess;
  onMove: (from: Square, to: Square) => void;
  playerColor: 'white' | 'black';
}

export default function ChessBoard({ game, onMove, playerColor }: ChessBoardProps) {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [validMoves, setValidMoves] = useState<Square[]>([]);

  const board = game.board();

  const handleSquareClick = (square: Square) => {
    if (game.turn() !== playerColor[0]) return;

    if (selectedSquare) {
      if (validMoves.includes(square)) {
        onMove(selectedSquare, square);
        setSelectedSquare(null);
        setValidMoves([]);
      } else {
        setSelectedSquare(square);
        const moves = game.moves({ square, verbose: true });
        setValidMoves(moves.map(m => m.to));
      }
    } else {
      const moves = game.moves({ square, verbose: true });
      if (moves.length > 0) {
        setSelectedSquare(square);
        setValidMoves(moves.map(m => m.to));
      }
    }
  };

  const getPieceSymbol = (piece: any) => {
    if (!piece) return null;

    const symbols: Record<string, string> = {
      'wp': '♙', 'wn': '♘', 'wb': '♗', 'wr': '♖', 'wq': '♕', 'wk': '♔',
      'bp': '♟', 'bn': '♞', 'bb': '♝', 'br': '♜', 'bq': '♛', 'bk': '♚'
    };

    return symbols[piece.color + piece.type];
  };

  const renderBoard = () => {
    const squares = [];
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = playerColor === 'white' ? [8, 7, 6, 5, 4, 3, 2, 1] : [1, 2, 3, 4, 5, 6, 7, 8];

    for (const rank of ranks) {
      for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
        const file = files[fileIndex];
        const square = `${file}${rank}` as Square;
        const piece = board[8 - rank][fileIndex];
        const isLight = (fileIndex + rank) % 2 === 0;
        const isSelected = selectedSquare === square;
        const isValidMove = validMoves.includes(square);

        squares.push(
          <div
            key={square}
            className={`square ${isLight ? 'light' : 'dark'} ${isSelected ? 'selected' : ''} ${isValidMove ? 'valid-move' : ''}`}
            onClick={() => handleSquareClick(square)}
          >
            <span className="piece">{getPieceSymbol(piece)}</span>
            <span className="coordinate">{square}</span>
          </div>
        );
      }
    }

    return squares;
  };

  return (
    <div className="chess-board">
      {renderBoard()}
    </div>
  );
}
