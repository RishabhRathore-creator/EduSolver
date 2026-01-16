import React, { useState } from 'react';
import { AgentResponse } from '../types';
import MathRenderer from './MathRenderer';
import { BookOpen, Check, GitMerge, Lightbulb } from 'lucide-react';

interface SolutionDisplayProps {
  data: AgentResponse | null;
}

const SolutionDisplay: React.FC<SolutionDisplayProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'primary' | 'alternative'>('primary');

  if (!data) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Understanding Agent Output */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <BrainIcon className="w-5 h-5 text-indigo-600 mt-1" />
          <div>
            <h3 className="font-semibold text-indigo-900">Understanding the Problem</h3>
            <div className="text-sm text-indigo-700 mt-1 flex flex-wrap gap-2">
              <span className="px-2 py-0.5 bg-white rounded border border-indigo-200">
                Topic: {data.understanding.topic}
              </span>
              <span className="px-2 py-0.5 bg-white rounded border border-indigo-200">
                Difficulty: {data.understanding.difficulty}
              </span>
            </div>
            <div className="mt-2 text-sm text-indigo-800">
              <strong>Key Concepts:</strong> {data.understanding.key_concepts.join(", ")}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for Methods */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-100">
          <button
            onClick={() => setActiveTab('primary')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'primary' 
                ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                : 'bg-slate-50 text-slate-500 hover:text-slate-700'
            }`}
          >
            <BookOpen size={16} />
            Primary Method
          </button>
          {data.alternative_solution && (
            <button
              onClick={() => setActiveTab('alternative')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'alternative' 
                  ? 'bg-white text-purple-600 border-b-2 border-purple-600' 
                  : 'bg-slate-50 text-slate-500 hover:text-slate-700'
              }`}
            >
              <GitMerge size={16} />
              Alternative Method
            </button>
          )}
        </div>

        <div className="p-6">
          <h4 className="text-lg font-bold text-slate-800 mb-4">
            {activeTab === 'primary' ? data.primary_solution.method_name : data.alternative_solution?.method_name}
          </h4>
          
          <div className="space-y-4">
            {(activeTab === 'primary' ? data.primary_solution.steps : data.alternative_solution?.steps || []).map((step, idx) => (
              <div key={idx} className="flex gap-4 group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center text-sm group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                  {idx + 1}
                </div>
                <div className="flex-grow pt-1.5">
                  <MathRenderer content={step} className="text-slate-700 leading-relaxed" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Final Answer</span>
            <MathRenderer 
              content={activeTab === 'primary' ? data.primary_solution.final_answer : data.alternative_solution?.final_answer || ''} 
              className="text-xl font-bold text-slate-900 mt-2" 
            />
          </div>
        </div>
      </div>

      {/* Validation & Pedagogy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-100 rounded-xl p-5">
          <h3 className="font-semibold text-green-900 flex items-center gap-2 mb-3">
            <Check size={18} /> Validation Agent
          </h3>
          <ul className="space-y-2">
            {data.validation.checks_performed.map((check, i) => (
              <li key={i} className="text-sm text-green-800 flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span> {check}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
          <h3 className="font-semibold text-amber-900 flex items-center gap-2 mb-3">
            <Lightbulb size={18} /> Pedagogical Notes
          </h3>
          <p className="text-sm text-amber-800 leading-relaxed">
            {data.pedagogical_notes}
          </p>
        </div>
      </div>

    </div>
  );
};

const BrainIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 3 2.5 2.5 0 0 0 .38 3.7 2.5 2.5 0 0 0 .12 4.02A2.5 2.5 0 0 0 7 20a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 2.22-2.24 2.5 2.5 0 0 0 .12-4.02 2.5 2.5 0 0 0 .38-3.7 2.5 2.5 0 0 0-1.32-3 2.5 2.5 0 0 0-1.98-3 2.5 2.5 0 0 0-4.42.46z"/>
    <path d="M12 16v4"/>
    <path d="M12 9v3"/>
  </svg>
);

export default SolutionDisplay;