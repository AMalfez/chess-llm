export interface GameState {
  fen: string;
  history: string[];
  isGameOver: boolean;
  result: string | null;
  turn: 'w' | 'b';
}

export interface LLMModel {
  id: string;
  name: string;
  endpoint: string;
}

export const AVAILABLE_MODELS: LLMModel[] = [
  {
    id: 'llama-3.1-70b',
    name: 'Llama 3.1 70B',
    endpoint: 'https://api.together.xyz/v1/chat/completions'
  },
  {
    id: 'llama-3.1-8b',
    name: 'Llama 3.1 8B',
    endpoint: 'https://api.together.xyz/v1/chat/completions'
  },
  {
    id: 'mistral-7b',
    name: 'Mistral 7B',
    endpoint: 'https://api.together.xyz/v1/chat/completions'
  },
  {
    id: 'qwen-2.5-72b',
    name: 'Qwen 2.5 72B',
    endpoint: 'https://api.together.xyz/v1/chat/completions'
  }
];
