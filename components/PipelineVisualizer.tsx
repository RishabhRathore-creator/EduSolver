import React from 'react';
import { AppState } from '../types';
import { Brain, Calculator, CheckCircle, GitBranch, Search } from 'lucide-react';

interface PipelineVisualizerProps {
  state: AppState;
}

const PipelineVisualizer: React.FC<PipelineVisualizerProps> = ({ state }) => {
  const steps = [
    { id: AppState.ANALYZING, label: 'Understanding', icon: Search },
    { id: AppState.SOLVING, label: 'Solving', icon: Calculator },
    { id: AppState.VALIDATING, label: 'Validating', icon: CheckCircle },
  ];

  const getStepStatus = (stepId: AppState) => {
    if (state === AppState.COMPLETE) return 'completed';
    if (state === AppState.ERROR) return 'error';
    if (state === AppState.IDLE) return 'idle';
    
    const order = [AppState.ANALYZING, AppState.SOLVING, AppState.VALIDATING];
    const currentIndex = order.indexOf(state);
    const stepIndex = order.indexOf(stepId);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="w-full py-6 px-4 mb-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Agentic Workflow Pipeline</h3>
      <div className="flex items-center justify-between relative">
        {/* Connection Line */}
        <div className="absolute left-0 top-1/2 w-full h-1 bg-slate-100 -z-0 rounded"></div>
        
        {steps.map((step) => {
          const status = getStepStatus(step.id);
          const Icon = step.icon;
          
          let colorClass = "bg-slate-100 text-slate-400 border-slate-200";
          if (status === 'active') colorClass = "bg-blue-100 text-blue-600 border-blue-300 ring-4 ring-blue-50";
          if (status === 'completed') colorClass = "bg-green-100 text-green-600 border-green-300";

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center group">
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${colorClass}`}>
                <Icon size={20} className={status === 'active' ? 'animate-pulse' : ''} />
              </div>
              <span className={`mt-2 text-xs font-medium ${status === 'active' ? 'text-blue-600' : 'text-slate-500'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineVisualizer;