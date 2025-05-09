// Gemini LLM API module
// Usage: import { streamGemini } from './geminiApi';
// Make sure to set process.env.GEMINI_API_KEY or pass apiKey explicitly

import { GoogleGenAI } from '@google/genai';

/**
 * Stream Gemini LLM response
 * @param {string} prompt - User input for Gemini
 * @param {object} [options] - Optional config: { apiKey, model, responseMimeType }
 * @returns {AsyncGenerator<string>} - Async generator that yields response chunks
 */
export async function* streamGemini(prompt, options = {}) {
  const {
    apiKey = process.env.GEMINI_API_KEY,
    model = 'gemini-2.5-flash-preview-04-17',
    responseMimeType = 'text/plain',
  } = options;

  if (!apiKey) throw new Error('GEMINI_API_KEY is required');

  const ai = new GoogleGenAI({ apiKey });
  const config = { responseMimeType };
  const contents = [
    {
      role: 'user',
      parts: [ { text: prompt } ],
    },
  ];

  const response = await ai.models.generateContentStream({ model, config, contents });
  for await (const chunk of response) {
    yield chunk.text;
  }
}
