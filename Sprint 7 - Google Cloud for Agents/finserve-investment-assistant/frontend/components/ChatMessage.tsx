import React from 'react';
import ReactMarkdown from 'react-markdown';
import { User, Building2, AlertCircle } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center shadow-sm
          ${isUser ? 'bg-brand-600 text-white ml-3' : 'bg-white border border-slate-200 text-brand-700 mr-3'}`}
        >
          {isUser ? <User size={20} /> : <Building2 size={20} />}
        </div>

        {/* Message Bubble */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-5 py-4 rounded-2xl shadow-sm text-[15px] leading-relaxed
            ${isUser 
              ? 'bg-brand-600 text-white rounded-tr-sm' 
              : 'bg-white border border-slate-100 text-slate-800 rounded-tl-sm'
            }
            ${message.isError ? 'bg-red-50 border-red-200 text-red-800' : ''}
          `}>
            {message.isError ? (
              <div className="flex items-center gap-2">
                <AlertCircle size={18} className="text-red-500" />
                <span>{message.text}</span>
              </div>
            ) : isUser ? (
              <div className="whitespace-pre-wrap">{message.text}</div>
            ) : (
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            )}
            
            {message.isStreaming && (
              <span className="inline-block w-1.5 h-4 ml-1 bg-brand-500 animate-pulse align-middle"></span>
            )}
          </div>
          <span className="text-xs text-slate-400 mt-1 px-1">
            {isUser ? 'You' : 'FinServe Assistant'}
          </span>
        </div>
      </div>
    </div>
  );
};
