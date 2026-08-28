import React from 'react';
import { Compass, Sparkles, BookOpen } from 'lucide-react';

export default function Navbar({ onNavigate, activeTab }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2 bg-blue-600 rounded-lg text-white group-hover:bg-blue-700 transition">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 tracking-tight block leading-tight">
                Campus Agent
              </span>
              <span className="text-xs text-blue-600 font-medium">Smart Club Recommender</span>
            </div>
          </div>

          <nav className="flex space-x-2">
            <button
              onClick={() => onNavigate('landing')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                activeTab === 'landing' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => onNavigate('form')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-2 ${
                activeTab === 'form' || activeTab === 'results' 
                  ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Find Clubs
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
