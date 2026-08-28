import React from 'react';
import { X, Check, Minus } from 'lucide-react';

export default function ComparisonModal({ clubs, onClose }) {
  if (!clubs || clubs.length < 2) return null;

  const [clubA, clubB] = clubs;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-slate-900">Compare Clubs</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-2 gap-6">
          {/* Club A */}
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Option 1</span>
              <h3 className="text-lg font-bold text-slate-900">{clubA.clubName}</h3>
              <p className="text-2xl font-extrabold text-blue-600 mt-1">{clubA.relevanceScore} / 100</p>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase">Category</span>
              <p className="text-sm font-semibold text-slate-800">{clubA.category}</p>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase">Meeting Days</span>
              <p className="text-sm text-slate-700">{clubA.meetingDays.join(', ')}</p>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase">Meeting Time</span>
              <p className="text-sm text-slate-700">{clubA.meetingTime}</p>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase">Location</span>
              <p className="text-sm text-slate-700">{clubA.location}</p>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase">Activities</span>
              <p className="text-sm text-slate-700">{clubA.activities.join(', ')}</p>
            </div>
          </div>

          {/* Club B */}
          <div className="space-y-4 border-l border-slate-200 pl-6">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Option 2</span>
              <h3 className="text-lg font-bold text-slate-900">{clubB.clubName}</h3>
              <p className="text-2xl font-extrabold text-indigo-600 mt-1">{clubB.relevanceScore} / 100</p>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase">Category</span>
              <p className="text-sm font-semibold text-slate-800">{clubB.category}</p>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase">Meeting Days</span>
              <p className="text-sm text-slate-700">{clubB.meetingDays.join(', ')}</p>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase">Meeting Time</span>
              <p className="text-sm text-slate-700">{clubB.meetingTime}</p>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase">Location</span>
              <p className="text-sm text-slate-700">{clubB.location}</p>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block uppercase">Activities</span>
              <p className="text-sm text-slate-700">{clubB.activities.join(', ')}</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 text-white font-semibold rounded-xl text-sm hover:bg-slate-900 transition"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
