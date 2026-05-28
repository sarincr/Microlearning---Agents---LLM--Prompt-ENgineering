import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, ShieldCheck, RefreshCw, Landmark } from 'lucide-react';
import { Message } from './types';
import { STARTER_QUESTIONS } from './constants';
import { sendMessageStream, resetChatSession } from './services/geminiService';
import { ChatMessage } from './components/ChatMessage';
import { StarterQuestions } from './components/StarterQuestions';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
    };

    const botMessageId = (Date.now() + 1).toString();
    const initialBotMessage: Message = {
      id: botMessageId,
      role: 'model',
      text: '',
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMessage, initialBotMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      await sendMessageStream(text, (chunk) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? { ...msg, text: msg.text + chunk }
              : msg
          )
        );
      });

      // Mark streaming as complete
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId ? { ...msg, isStreaming: false } : msg
        )
      );
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                text: "I'm sorry, I encountered an error while processing your request. Please try again later.",
                isStreaming: false,
                isError: true,
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      // Re-focus input after response
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear the conversation?')) {
      resetChatSession();
      setMessages([]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <header className="bg-finance-dark text-white py-4 px-6 shadow-md z-10 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-brand-500 p-2 rounded-lg">
            <Landmark size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">FinServe</h1>
            <p className="text-xs text-slate-300 flex items-center gap-1">
              <ShieldCheck size={12} /> Investment Assistant
            </p>
          </div>
        </div>
        <button
          onClick={handleReset}
          disabled={messages.length === 0 || isLoading}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Reset Conversation"
        >
          <RefreshCw size={20} />
        </button>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[60vh] animate-in fade-in duration-500">
              <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <Landmark size={40} className="text-brand-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">
                Welcome to FinServe Support
              </h2>
              <p className="text-slate-500 text-center max-w-md mb-8">
                I'm your virtual assistant, ready to help you understand different investment accounts, retirement plans, and general financial concepts.
              </p>
              <StarterQuestions
                questions={STARTER_QUESTIONS}
                onSelect={handleSendMessage}
                disabled={isLoading}
              />
            </div>
          ) : (
            <div className="pb-4">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input Area */}
      <footer className="bg-white border-t border-slate-200 p-4 shrink-0">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
            <div className="relative flex-1 bg-slate-50 border border-slate-300 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-brand-500 transition-all">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about IRAs, 401(k)s, brokerage accounts..."
                className="w-full max-h-32 min-h-[56px] bg-transparent border-none resize-none py-4 pl-4 pr-12 focus:ring-0 text-slate-800 placeholder-slate-400"
                rows={1}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="h-14 w-14 flex-shrink-0 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl flex items-center justify-center shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} className={inputValue.trim() && !isLoading ? 'translate-x-0.5' : ''} />
            </button>
          </form>
          <div className="text-center mt-3">
            <p className="text-[11px] text-slate-400">
              FinServe Assistant can make mistakes. Consider verifying important financial information.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
