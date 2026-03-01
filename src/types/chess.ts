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
}

export const AVAILABLE_MODELS: LLMModel[] = [
  {
    id: 'meta-llama/Llama-3.1-8B-Instruct:novita',
    name: 'Llama 3.1 8B',
  },
  {
    id: 'mistralai/Mistral-7B-Instruct-v0.2:featherless-ai',
    name: 'Mistral 7B',
  },
  {
    id: 'Qwen/Qwen2.5-72B:featherless-ai',
    name: 'Qwen 2.5 72B',
  }
];
