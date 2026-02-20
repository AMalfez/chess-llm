import { Chess } from 'chess.js';

export async function getAIMove(game: Chess, modelId: string): Promise<string> {
  const fen = game.fen();
  const legalMoves = game.moves();
  const history = game.history();

  const prompt = `You are a chess engine. Given the current position and legal moves, choose the best move.

Current position (FEN): ${fen}
Move history: ${history.join(', ') || 'Game start'}
Legal moves: ${legalMoves.join(', ')}

Respond with ONLY the move in standard algebraic notation (e.g., "e4", "Nf3", "O-O"). No explanation, just the move.`;

  try {
    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_TOGETHER_API_KEY || ''}`
      },
      body: JSON.stringify({
        model: modelId,
        messages: [
          {
            role: 'system',
            content: 'You are a chess engine that responds with only chess moves in standard algebraic notation.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 50,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const moveText = data.choices[0]?.message?.content?.trim() || '';

    const cleanMove = moveText.split('\n')[0].trim().replace(/['".,!?]/g, '');

    if (legalMoves.includes(cleanMove)) {
      return cleanMove;
    }

    for (const move of legalMoves) {
      if (cleanMove.toLowerCase().includes(move.toLowerCase())) {
        return move;
      }
    }

    const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
    console.warn(`AI returned invalid move "${cleanMove}", using random move: ${randomMove}`);
    return randomMove;

  } catch (error) {
    console.error('Error getting AI move:', error);
    const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
    return randomMove;
  }
}
