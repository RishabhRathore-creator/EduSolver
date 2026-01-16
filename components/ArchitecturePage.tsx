import React from 'react';
import { Database, Server, Cpu, Layers, Layout, Code2, Workflow } from 'lucide-react';

const ArchitecturePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">System Architecture</h1>
        <p className="text-xl text-slate-600">
          A deep dive into the technical stack powering EduSolver.
        </p>
      </div>

      <div className="space-y-12">
        {/* Backend Stack */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-50 p-6 border-b border-slate-200 flex items-center gap-3">
            <Server className="text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-800">Core Infrastructure</h2>
          </div>
          <div className="p-8 grid md:grid-cols-2 gap-8">
            <TechItem 
              title="FastAPI (Python)"
              desc="High-performance async backend handling request orchestration and serving the ML inference endpoints."
            />
            <TechItem 
              title="LangGraph"
              desc="Manages the stateful multi-agent workflows, allowing cyclic graph flows for reasoning loops (Understand → Solve → Validate)."
            />
            <TechItem 
              title="LangChain"
              desc="Provides the prompt engineering framework and abstraction layer for integrating with Gemini models."
            />
            <TechItem 
              title="Pydantic"
              desc="Enforces strict JSON schema validation on LLM outputs, ensuring the frontend always receives structured data."
            />
          </div>
        </div>

        {/* Frontend Stack */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-50 p-6 border-b border-slate-200 flex items-center gap-3">
            <Layout className="text-blue-600" />
            <h2 className="text-xl font-bold text-slate-800">Frontend & Visualization</h2>
          </div>
          <div className="p-8 grid md:grid-cols-2 gap-8">
            <TechItem 
              title="React & TypeScript"
              desc="Component-based UI with strict type safety matching the Pydantic schemas from the backend."
            />
            <TechItem 
              title="MathJax"
              desc="Renders complex LaTeX mathematical expressions and scientific notation directly in the browser."
            />
            <TechItem 
              title="Recharts"
              desc="Visualizes model training metrics (Loss, Accuracy, Precision) through interactive, responsive charts."
            />
            <TechItem 
              title="Tesseract (OCR)"
              desc="Handles client-side image preprocessing and text extraction for problem images."
            />
          </div>
        </div>

        {/* Workflow Diagram */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 lg:p-12">
          <div className="flex items-center gap-3 mb-8">
             <Workflow className="text-green-400" />
             <h2 className="text-2xl font-bold">Agentic Data Flow</h2>
          </div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 text-center">
            <FlowStep label="User Input" sub="(Text/Image)" />
            <Arrow />
            <FlowStep label="Understanding Agent" sub="(Topic/Difficulty)" />
            <Arrow />
            <FlowStep label="Solver Agents" sub="(Primary/Alternative)" />
            <Arrow />
            <FlowStep label="Validation Agent" sub="(Consistency Check)" />
            <Arrow />
            <FlowStep label="Structured Output" sub="(JSON)" />
          </div>
        </div>
      </div>
    </div>
  );
};

const TechItem = ({ title, desc }: { title: string, desc: string }) => (
  <div className="flex flex-col gap-2">
    <h3 className="font-bold text-slate-900 flex items-center gap-2">
      <Code2 size={18} className="text-slate-400" />
      {title}
    </h3>
    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
  </div>
);

const FlowStep = ({ label, sub }: { label: string, sub: string }) => (
  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 w-full md:w-40 flex-shrink-0">
    <div className="font-bold text-white mb-1">{label}</div>
    <div className="text-xs text-slate-400">{sub}</div>
  </div>
);

const Arrow = () => (
  <div className="text-slate-600 rotate-90 md:rotate-0">
    ➜
  </div>
);

export default ArchitecturePage;