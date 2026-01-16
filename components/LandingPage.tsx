import React from 'react';
import { ArrowRight, BrainCircuit, Database, Layers, ShieldCheck, Zap } from 'lucide-react';
import { Page } from '../types';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 lg:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wide mb-6 border border-blue-200">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              Trained on NCERT, JEE & NEET Datasets
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Master STEM with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Multi-Agent AI</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Experience the next generation of problem solving. EduSolver uses autonomous agents to reason, solve, validate, and teach complex mathematical concepts step-by-step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => onNavigate('solver')}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
              >
                Start Solving <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => onNavigate('architecture')}
                className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                View Architecture
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why EduSolver?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our architecture combines the speed of modern LLMs with the rigor of academic validation libraries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={BrainCircuit}
              title="Multi-Agent Reasoning"
              description="Orchestrated via LangGraph, separate agents handle understanding, solving, and pedagogical explanations."
              color="text-indigo-600"
              bg="bg-indigo-50"
            />
            <FeatureCard 
              icon={ShieldCheck}
              title="Rigorous Validation"
              description="Output is structured via Pydantic and cross-verified by a dedicated validation agent to ensure consistency."
              color="text-green-600"
              bg="bg-green-50"
            />
            <FeatureCard 
              icon={Database}
              title="Specialized Training"
              description="Fine-tuned on thousands of NCERT, JEE, and NEET problems for domain-specific accuracy."
              color="text-amber-600"
              bg="bg-amber-50"
            />
          </div>
        </div>
      </section>

      {/* Stats Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-8 lg:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <h3 className="text-3xl font-bold mb-6">Transparent Model Performance</h3>
              <p className="text-slate-300 mb-8 text-lg">
                We believe in trust through transparency. Monitor our model's accuracy, precision, and recall metrics in real-time as we continue to train on new datasets.
              </p>
              <button 
                onClick={() => onNavigate('monitor')}
                className="text-blue-400 font-semibold hover:text-blue-300 flex items-center gap-2"
              >
                View Performance Dashboard <ArrowRight size={16} />
              </button>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <StatBox label="Model Accuracy" value="94.2%" />
              <StatBox label="Parameters" value="7B+" />
              <StatBox label="Reasoning Depth" value="32k tok" />
              <StatBox label="Avg Latency" value="1.2s" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color, bg }: any) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${bg} ${color}`}>
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const StatBox = ({ label, value }: any) => (
  <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
    <p className="text-3xl font-bold text-white mb-1">{value}</p>
    <p className="text-sm text-slate-400">{label}</p>
  </div>
);

export default LandingPage;