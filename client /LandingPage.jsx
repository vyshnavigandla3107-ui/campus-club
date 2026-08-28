import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, UserCheck, Cpu, Sliders, Trophy, BookOpen } from 'lucide-react';

export default function LandingPage({ onStart, onLoadDemo }) {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto px-4 pt-6">
        <div className="inline-flex items-center gap-2 px-3 me-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" /> AI-Powered Recommendation Agent
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          Campus Agent
        </h1>
        <p className="text-xl text-blue-600 font-semibold mb-3">
          Smart Student Club Recommendation System
        </p>
        <p className="text-base text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          Find the campus clubs that best match your interests, skills, preferred activities, and available schedule with transparent relevance scoring.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 text-base"
          >
            Start Recommendation <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={onLoadDemo}
            className="w-full sm:w-auto px-6 py-3.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition flex items-center justify-center gap-2 text-base shadow-sm"
          >
            Load Demo Profile
          </button>
        </div>
      </section>

      {/* Workflow Scaffolding Flowchart */}
      <section className="max-w-5xl mx-auto px-4">
        <h2 className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-8">
          Recommendation Pipeline Architecture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm hover:border-blue-300 transition">
            <div className="w-10 h-10 mx-auto mb-3 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-800 text-sm">1. Student Profile</h3>
            <p className="text-xs text-slate-500 mt-1">Interests, Skills & Schedule</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm hover:border-blue-300 transition">
            <div className="w-10 h-10 mx-auto mb-3 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 font-bold">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-800 text-sm">2. Preference Analysis</h3>
            <p className="text-xs text-slate-500 mt-1">String Normalization</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm hover:border-blue-300 transition">
            <div className="w-10 h-10 mx-auto mb-3 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-800 text-sm">3. Club Matching</h3>
            <p className="text-xs text-slate-500 mt-1">Matrix Cross-Check</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm hover:border-blue-300 transition">
            <div className="w-10 h-10 mx-auto mb-3 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-800 text-sm">4. Relevance Scoring</h3>
            <p className="text-xs text-slate-500 mt-1">100-Point Weighted System</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-sm hover:border-blue-300 transition">
            <div className="w-10 h-10 mx-auto mb-3 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 font-bold">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-800 text-sm">5. Ranked Results</h3>
            <p className="text-xs text-slate-500 mt-1">Explained Recommendations</p>
          </div>
        </div>
      </section>

      {/* Key Feature Highlights */}
      <section className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 text-base mb-2">Transparent Scoring</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every match provides an exact point breakdown across interests (40%), skills (20%), activities (15%), schedule (15%), and category (10%).
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 text-base mb-2">Schedule Alignment</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Checks both day availability and time window overlaps to prevent student time conflicts.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 text-base mb-2">Alternative Fallbacks</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            If no exact high match exists, the engine provides closest alternative options rather than empty states.
          </p>
        </div>
      </section>
    </div>
  );
}
