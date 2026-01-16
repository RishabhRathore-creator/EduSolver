export type Page = 'home' | 'solver' | 'monitor' | 'architecture';

export interface MathProblem {
  id: string;
  question: string;
  imageUri?: string;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface StudentProgress {
  topic: string;
  score: number;
  problemsSolved: number;
}

export interface AgentResponse {
  understanding: {
    topic: string;
    difficulty: string;
    key_concepts: string[];
  };
  primary_solution: {
    method_name: string;
    steps: string[];
    final_answer: string;
  };
  alternative_solution?: {
    method_name: string;
    steps: string[];
    final_answer: string;
  };
  validation: {
    is_consistent: boolean;
    checks_performed: string[];
  };
  pedagogical_notes: string;
}

export interface TrainingMetrics {
  epoch: number;
  accuracy: number;
  loss: number;
  val_accuracy: number;
  val_loss: number;
}

export interface ModelStats {
  precision: number;
  recall: number;
  f1Score: number;
  totalParameters: string;
  trainingTime: string;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING', // OCR / Understanding Agent
  SOLVING = 'SOLVING', // Solution Agents
  VALIDATING = 'VALIDATING', // Validation Agent
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}