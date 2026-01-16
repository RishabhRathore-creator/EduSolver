import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrainingMetrics, ModelStats } from '../types';
import { Activity, Target, Zap, Clock } from 'lucide-react';

// Simulated training data for the custom NCERT/JEE dataset
const mockTrainingData: TrainingMetrics[] = Array.from({ length: 20 }, (_, i) => ({
  epoch: i + 1,
  accuracy: 0.6 + (0.35 * (1 - Math.exp(-0.2 * i))) + (Math.random() * 0.02),
  val_accuracy: 0.55 + (0.38 * (1 - Math.exp(-0.2 * i))) + (Math.random() * 0.03),
  loss: 1.5 * Math.exp(-0.15 * i) + (Math.random() * 0.1),
  val_loss: 1.6 * Math.exp(-0.12 * i) + (Math.random() * 0.15),
}));

const mockStats: ModelStats = {
  precision: 0.94,
  recall: 0.91,
  f1Score: 0.925,
  totalParameters: "7B",
  trainingTime: "42h 15m"
};

const ModelMonitor: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Model Performance Monitor</h2>
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium border border-green-200 flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          Training Complete
        </span>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard 
          title="Precision" 
          value={`${(mockStats.precision * 100).toFixed(1)}%`} 
          icon={Target} 
          color="text-blue-600" 
          bg="bg-blue-50" 
        />
        <MetricCard 
          title="Recall" 
          value={`${(mockStats.recall * 100).toFixed(1)}%`} 
          icon={Activity} 
          color="text-purple-600" 
          bg="bg-purple-50" 
        />
        <MetricCard 
          title="F1 Score" 
          value={mockStats.f1Score.toFixed(3)} 
          icon={Zap} 
          color="text-amber-600" 
          bg="bg-amber-50" 
        />
        <MetricCard 
          title="Training Time" 
          value={mockStats.trainingTime} 
          icon={Clock} 
          color="text-slate-600" 
          bg="bg-slate-50" 
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Accuracy Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Accuracy over Epochs</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrainingData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="epoch" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} domain={[0, 1]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Line type="monotone" dataKey="accuracy" name="Train Acc" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="val_accuracy" name="Val Acc" stroke="#6366f1" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Loss Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Loss Convergence</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTrainingData}>
                <defs>
                  <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="epoch" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Area type="monotone" dataKey="loss" name="Train Loss" stroke="#ef4444" fillOpacity={1} fill="url(#colorLoss)" />
                <Area type="monotone" dataKey="val_loss" name="Val Loss" stroke="#f97316" fill="transparent" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon: Icon, color, bg }: any) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bg} ${color}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

export default ModelMonitor;