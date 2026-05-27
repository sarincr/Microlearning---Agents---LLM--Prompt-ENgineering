import React from 'react';
import { MessageSquarePlus } from 'lucide-react';
import { StarterQuestion } from '../types';

interface StarterQuestionsProps {
  questions: StarterQuestion[];
  onSelect: (text: string) => void;
  disabled?: boolean;
}

export const StarterQuestions: React.FC<StarterQuestionsProps> = ({ questions, onSelect, disabled }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 mb-4">
      <p className="text-sm text-slate-500 mb-3 text-center font-medium">Common Questions</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {questions.map((q) => (
          <button
            key={q.id}
            onClick={() => onSelect(q.text)}
            disabled={disabled}
            className="flex items-start text-left p-4 bg-white border border-slate-200 rounded-xl hover:border-brand-300 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <MessageSquarePlus className="text-brand-500 mt-0.5 mr-3 flex-shrink-0 group-hover:text-brand-600" size={18} />
            <span className="text-sm text-slate-700 group-hover:text-slate-900">{q.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
