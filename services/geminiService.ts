import { GoogleGenAI, Type } from "@google/genai";
import { AgentResponse } from "../types";

// Check for API key availability
const apiKey = process.env.API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const checkApiKey = (): boolean => {
  return !!apiKey;
};

const SYSTEM_INSTRUCTION_BASE = `
You are EduSolver, a Multi-Agent STEM AI trained on NCERT, JEE, and NEET datasets.
Your goal is to provide accurate, structured mathematical and scientific solutions.
Use LaTeX formatting for all mathematical expressions (e.g., $x^2 + y^2 = r^2$).
Ensure the output is strictly valid JSON matching the schema provided.
`;

const SYSTEM_INSTRUCTION_DEEP = `
${SYSTEM_INSTRUCTION_BASE}
You must employ a Multi-Agent workflow:
1. Understanding Agent: Analyze the topic and difficulty.
2. Solution Agent: Provide a detailed step-by-step academic solution.
3. Alternative Agent: Provide a second method (graphical, intuitive, or shortcut).
4. Validation Agent: Verify consistency between methods.
5. Pedagogical Agent: Add exam tips and memory aids.
`;

const SYSTEM_INSTRUCTION_QUICK = `
${SYSTEM_INSTRUCTION_BASE}
Provide a direct, optimal solution immediately.
Focus on the primary solution and the final answer. 
You may skip extensive validation steps or alternative methods if they are not immediately obvious, but the format must still match the JSON structure.
`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    understanding: {
      type: Type.OBJECT,
      properties: {
        topic: { type: Type.STRING },
        difficulty: { type: Type.STRING },
        key_concepts: { type: Type.ARRAY, items: { type: Type.STRING } }
      }
    },
    primary_solution: {
      type: Type.OBJECT,
      properties: {
        method_name: { type: Type.STRING },
        steps: { type: Type.ARRAY, items: { type: Type.STRING } },
        final_answer: { type: Type.STRING }
      }
    },
    alternative_solution: {
      type: Type.OBJECT,
      properties: {
        method_name: { type: Type.STRING },
        steps: { type: Type.ARRAY, items: { type: Type.STRING } },
        final_answer: { type: Type.STRING }
      }
    },
    validation: {
      type: Type.OBJECT,
      properties: {
        is_consistent: { type: Type.BOOLEAN },
        checks_performed: { type: Type.ARRAY, items: { type: Type.STRING } }
      }
    },
    pedagogical_notes: { type: Type.STRING }
  }
};

export const solveMathProblem = async (
  prompt: string, 
  imageBase64?: string, 
  mode: 'quick' | 'deep' = 'deep'
): Promise<AgentResponse> => {
  if (!ai) throw new Error("API Key not found");

  const parts: any[] = [{ text: prompt }];
  
  if (imageBase64) {
    parts.unshift({
      inlineData: {
        mimeType: 'image/png',
        data: imageBase64
      }
    });
  }

  // Configuration based on mode
  const modelName = mode === 'deep' ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
  const systemInstruction = mode === 'deep' ? SYSTEM_INSTRUCTION_DEEP : SYSTEM_INSTRUCTION_QUICK;
  const thinkingBudget = mode === 'deep' ? 32768 : 0; // High budget for deep, 0/disabled for quick

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: { parts },
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
        thinkingConfig: mode === 'deep' ? { thinkingBudget } : undefined
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as AgentResponse;
  } catch (error) {
    console.error("Error solving problem:", error);
    throw error;
  }
};

export const chatWithTutor = async (
  history: { role: string; parts: { text: string }[] }[],
  message: string
) => {
  if (!ai) throw new Error("API Key not found");

  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    history: history,
    config: {
      systemInstruction: "You are a helpful and encouraging STEM tutor. Guide the student to the answer rather than just giving it. Use LaTeX for math.",
    }
  });

  return await chat.sendMessageStream({ message });
};