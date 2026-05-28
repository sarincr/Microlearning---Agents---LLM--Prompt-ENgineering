import { GoogleGenAI, Chat } from '@google/genai';

// Initialize the SDK. Assumes process.env.API_KEY is available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `You are a professional, knowledgeable, and helpful financial assistant for "FinServe", a reputable financial services website.
Your primary role is to answer user questions about different types of investment accounts and general personal finance concepts, such as:
- Individual Retirement Accounts (IRAs) - Traditional, Roth, SEP, SIMPLE
- Employer-sponsored plans (401(k)s, 403(b)s)
- Brokerage Accounts (Individual, Joint, Margin)
- Certificates of Deposit (CDs) and High-Yield Savings Accounts
- Mutual Funds, ETFs, Stocks, and Bonds (general concepts)
- 529 College Savings Plans
- Health Savings Accounts (HSAs) as investment vehicles

Guidelines:
1. Provide clear, concise, and accurate information suitable for a general audience. Avoid overly dense jargon where possible, or explain it simply.
2. Use formatting (bullet points, bold text) to make complex information easy to read and digest.
3. Maintain a professional, trustworthy, objective, and polite tone.
4. If a user asks a question completely unrelated to finance, investment accounts, or general economic concepts, politely decline to answer and guide them back to your area of expertise (e.g., "I specialize in financial and investment account information. How can I help you with your financial planning today?").
5. ALWAYS include a brief disclaimer at the very end of your response stating: "*Disclaimer: This information is for educational purposes only and does not constitute personalized financial, tax, or legal advice.*"`;

/**
 * Initializes or retrieves the existing chat session.
 */
export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3, // Lower temperature for more factual, consistent responses
      },
    });
  }
  return chatSession;
};

/**
 * Sends a message to the model and streams the response back via a callback.
 */
export const sendMessageStream = async (
  message: string,
  onChunk: (text: string) => void
): Promise<void> => {
  const chat = getChatSession();
  try {
    const responseStream = await chat.sendMessageStream({ message });
    for await (const chunk of responseStream) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Error in Gemini stream:", error);
    throw error;
  }
};

/**
 * Resets the chat session (useful for a "Start Over" feature).
 */
export const resetChatSession = () => {
  chatSession = null;
};
