import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { StudentProgress } from '../types';

const mockData: StudentProgress[] = [
  { topic: 'Algebra', score: 85, problemsSolved: 12 },
  { topic: 'Geometry', score: 65, problemsSolved: 8 },
  { topic: 'Calculus', score: 45, problemsSolved: 4 },
  { topic: 'Trig', score: 78, problemsSolved: 10 },
  { topic: 'Stats', score: 92, problemsSolved: 15 },
];

const StudentDashboard: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
      <h2 className="text-lg font-bold text-slate-800 mb-6">Learning Progress</h2>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="topic" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip 
              cursor={{ fill: '#f1f5f9' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="score" radius={[4, 4, 0, 0]}>
              {mockData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.score > 80 ? '#22c55e' : entry.score > 60 ? '#3b82f6' : '#ef4444'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Recent Mastery</h3>
        {mockData.sort((a, b) => b.score - a.score).slice(0, 3).map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors">
            <span className="text-sm font-medium text-slate-700">{item.topic}</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${item.score > 80 ? 'bg-green-500' : 'bg-blue-500'}`} 
                  style={{ width: `${item.score}%` }}
                />
              </div>
              <span className="text-xs font-bold text-slate-600 w-8 text-right">{item.score}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;