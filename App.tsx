import React, { useState } from 'react';
import { solveMathProblem, checkApiKey } from './services/geminiService';
import { AppState, AgentResponse, Page } from './types';
import SolutionDisplay from './components/SolutionDisplay';
import PipelineVisualizer from './components/PipelineVisualizer';
import ModelMonitor from './components/ModelMonitor';
import LandingPage from './components/LandingPage';
import ArchitecturePage from './components/ArchitecturePage';
import { Image as ImageIcon, X, Loader2, Sparkles, Zap, BrainCircuit, Activity, Home, Layers, Calculator } from 'lucide-react';

type SolveMode = 'quick' | 'deep';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [prompt, setPrompt] = useState('');
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [solution, setSolution] = useState<AgentResponse | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [solveMode, setSolveMode] = useState<SolveMode>('deep');

  const hasKey = checkApiKey();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSolve = async () => {
    if (!prompt && !selectedImage) return;
    
    setAppState(AppState.ANALYZING);
    setErrorMsg(null);
    setSolution(null);

    try {
      const isQuick = solveMode === 'quick';
      
      // Simulate "Understanding" agent time
      await new Promise(resolve => setTimeout(resolve, isQuick ? 500 : 1500));
      
      setAppState(AppState.SOLVING);
      
      const imageBase64 = selectedImage ? selectedImage.split(',')[1] : undefined;
      const result = await solveMathProblem(prompt, imageBase64, solveMode);
      
      if (isQuick) {
        // Quick mode: Skip explicit validation visual step for speed
        setSolution(result);
        setAppState(AppState.COMPLETE);
      } else {
        // Deep mode: Show validation step to visualize the rigorous check
        setAppState(AppState.VALIDATING);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSolution(result);
        setAppState(AppState.COMPLETE);
      }

    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to generate solution. Please try again.");
      setAppState(AppState.ERROR);
    }
  };

  const SolverView = () => (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Input Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <label className="block text-lg font-bold text-slate-800">
            What would you like to solve today?
          </label>
          
          {/* Enhanced Mode Toggle */}
          <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200 w-full sm:w-auto">
            <button
              onClick={() => setSolveMode('quick')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                solveMode === 'quick' 
                ? 'bg-white text-amber-600 shadow-sm ring-1 ring-black/5 scale-100' 
                : 'text-slate-500 hover:text-slate-700 scale-95 opacity-70 hover:opacity-100'
              }`}
            >
              <Zap size={14} className={solveMode === 'quick' ? 'fill-current' : ''} />
              Quick Solve
            </button>
            <button
              onClick={() => setSolveMode('deep')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                solveMode === 'deep' 
                ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-black/5 scale-100' 
                : 'text-slate-500 hover:text-slate-700 scale-95 opacity-70 hover:opacity-100'
              }`}
            >
              <BrainCircuit size={14} />
              Deep Reason
            </button>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={solveMode === 'deep' 
              ? "Enter a complex STEM problem (NCERT/JEE/NEET). I will use multiple agents to reason through it..."
              : "Enter a question for a quick answer..."}
            className="w-full min-h-[140px] p-4 pr-32 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all resize-none text-slate-800 placeholder:text-slate-400"
          />
          
          {selectedImage && (
            <div className="absolute top-4 right-4 w-20 h-20 rounded-lg overflow-hidden border-2 border-slate-200 bg-slate-50 group">
              <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
          )}

          <div className="absolute bottom-4 left-4 flex gap-2">
            <label className="cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm text-slate-600 transition-colors border border-slate-200">
              <ImageIcon size={16} />
              <span className="hidden sm:inline">Upload Image</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
            <div className="text-xs text-slate-400 flex items-center ml-2">
               {solveMode === 'deep' ? 'Using Multi-Agent Graph' : 'Using Low-Latency Flash Model'}
            </div>
          </div>

          <button
            onClick={handleSolve}
            disabled={appState === AppState.ANALYZING || appState === AppState.SOLVING || appState === AppState.VALIDATING || (!prompt && !selectedImage)}
            className={`absolute bottom-4 right-4 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg ${
              solveMode === 'deep' 
                ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20' 
                : 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
            }`}
          >
            {appState !== AppState.IDLE && appState !== AppState.COMPLETE && appState !== AppState.ERROR ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Sparkles size={18} />
            )}
            {solveMode === 'deep' ? 'Analyze & Solve' : 'Quick Answer'}
          </button>
        </div>
      </div>

      {/* Visualizer & Output */}
      {appState !== AppState.IDLE && (
        <>
          {/* Only show full pipeline visualizer if we are in deep mode or if we used it */}
          {solveMode === 'deep' && <PipelineVisualizer state={appState} />}
          
          {appState === AppState.ERROR && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200">
                {errorMsg}
              </div>
          )}

          {solution && (
            <SolutionDisplay data={solution} />
          )}
        </>
      )}
      
      {appState === AppState.IDLE && (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 min-h-[300px] border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
          <div className={`p-4 rounded-full mb-4 ${solveMode === 'deep' ? 'bg-indigo-50 text-indigo-300' : 'bg-amber-50 text-amber-300'}`}>
            {solveMode === 'deep' ? <BrainCircuit size={48} /> : <Zap size={48} />}
          </div>
          <p className="text-lg font-medium text-slate-500">Ready to unlock understanding</p>
          <p className="text-sm">
            {solveMode === 'deep' 
              ? "Deep Reasoning mode active. I will think step-by-step." 
              : "Quick Solve mode active. I will answer immediately."}
          </p>
        </div>
      )}
    </div>
  );

  const NavItem = ({ page, label, icon: Icon }: { page: Page, label: string, icon: any }) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
        currentPage === page 
          ? 'bg-slate-100 text-slate-900' 
          : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
      }`}
    >
      <Icon size={16} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  if (!hasKey) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center border border-slate-200">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <X size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">API Key Missing</h1>
          <p className="text-slate-600 mb-6">
            Please provide a valid Google Gemini API Key in your environment variables to use EduSolver.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold shadow-md shadow-blue-600/20">
              ES
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
              EduSolver
            </h1>
          </div>
          
          <nav className="flex items-center gap-1">
            <NavItem page="home" label="Home" icon={Home} />
            <NavItem page="solver" label="AI Solver" icon={Calculator} />
            <NavItem page="monitor" label="Monitor" icon={Activity} />
            <NavItem page="architecture" label="Architecture" icon={Layers} />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && <LandingPage onNavigate={setCurrentPage} />}
        {currentPage === 'solver' && <SolverView />}
        {currentPage === 'monitor' && (
          <div className="max-w-6xl mx-auto px-4 py-8">
            <ModelMonitor />
          </div>
        )}
        {currentPage === 'architecture' && <ArchitecturePage />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} EduSolver AI. Built with Gemini 3 Pro, LangGraph, & React.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;