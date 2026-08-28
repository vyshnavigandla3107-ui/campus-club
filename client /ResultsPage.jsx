import React, { useState } from 'react';
import { Trophy, Calendar, Clock, MapPin, Award, CheckCircle, ArrowLeft, Layers, Info } from 'lucide-react';

export default function ResultsPage({ results, onBack, onCompare }) {
  const { recommendations, isStrongMatchFound, bestMatch } = results;
  const [selectedClubsForCompare, setSelectedClubsForCompare] = useState([]);

  const toggleCompare = (club) => {
    if (selectedClubsForCompare.some(c => c.id === club.id)) {
      setSelectedClubsForCompare(selectedClubsForCompare.filter(c => c.id !== club.id));
    } else {
      if (selectedClubsForCompare.length >= 2) {
        alert("Select up to 2 clubs to compare side-by-side.");
        return;
      }
      setSelectedClubsForCompare([...selectedClubsForCompare, club]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Top Banner Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Edit Profile
        </button>

        {selectedClubsForCompare.length > 0 && (
          <button
            onClick={() => onCompare(selectedClubsForCompare)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-4 py-2 rounded-xl shadow transition flex items-center gap-2"
          >
            <Layers className="w-4 h-4" /> Compare ({selectedClubsForCompare.length}/2) Selected
          </button>
        )}
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-slate-900">Recommended Clubs For You</h1>
        <p className="text-slate-500 text-sm mt-1">Ranked based on multi-variable match analysis</p>
      </div>

      {/* Best Match Highlight Box */}
      {bestMatch && isStrongMatchFound && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-3 right-4 opacity-10 font-black text-8xl select-none">
            #1
          </div>
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-wide">
              <Trophy className="w-3.5 h-3.5 text-amber-300" /> BEST MATCH RECOMMENDATION
            </div>
            <div className="flex justify-between items-baseline flex-wrap gap-2">
              <h2 className="text-2xl sm:text-3xl font-bold">{bestMatch.clubName}</h2>
              <span className="text-2xl font-extrabold text-amber-300">
                {bestMatch.relevanceScore}/100
              </span>
            </div>
            <p className="text-blue-100 text-sm">{bestMatch.description}</p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-blue-100">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {bestMatch.meetingDays.join(', ')}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {bestMatch.meetingTime}</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {bestMatch.location}</span>
            </div>
          </div>
        </div>
      )}

      {/* Weak Match Warning Banner */}
      {!isStrongMatchFound && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-900 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-base">No strong match found.</h3>
            <p className="text-sm text-amber-800 mt-0.5">
              Showing alternative clubs that offer the closest match to your provided availability and interest preferences.
            </p>
          </div>
        </div>
      )}

      {/* Ranked Club List */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
          {isStrongMatchFound ? 'Recommended Club Order' : 'Alternative Clubs'}
        </h2>

        {recommendations.map((club, index) => {
          const rank = index + 1;
          const isSelectedForCompare = selectedClubsForCompare.some(c => c.id === club.id);

          return (
            <div 
              key={club.id} 
              className={`bg-white rounded-2xl border p-6 transition shadow-sm hover:shadow-md space-y-4 ${
                isSelectedForCompare ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-slate-200'
              }`}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center text-sm border border-slate-200">
                    {rank}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{club.clubName}</h3>
                    <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                      {club.category}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-extrabold text-blue-600">
                    {club.relevanceScore} <span className="text-xs font-normal text-slate-500">/ 100</span>
                  </div>
                  <span className="text-xs font-medium text-slate-400">Relevance Score</span>
                </div>
              </div>

              {/* Score Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    club.relevanceScore >= 80 ? 'bg-emerald-500' :
                    club.relevanceScore >= 50 ? 'bg-blue-600' : 'bg-amber-500'
                  }`}
                  style={{ width: `${club.relevanceScore}%` }}
                ></div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <span className="font-semibold text-slate-700 block mb-1">Activities:</span>
                  <p className="text-slate-600">{club.activities.join(', ')}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-700 block mb-1">Required Skills:</span>
                  <p className="text-slate-600">{club.requiredSkills.join(', ')}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-700 block mb-1">Meeting Schedule:</span>
                  <p className="text-slate-600 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> {club.meetingDays.join(', ')} ({club.meetingTime})
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-slate-700 block mb-1">Location:</span>
                  <p className="text-slate-600 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {club.location}
                  </p>
                </div>
              </div>

              {/* Why This Matches Section */}
              <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1 mb-1">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Why this club matches you
                </span>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{club.matchExplanation}"
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => toggleCompare(club)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition ${
                    isSelectedForCompare 
                      ? 'bg-indigo-600 text-white border-indigo-600' 
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {isSelectedForCompare ? '✓ Selected to Compare' : '+ Compare Club'}
                </button>

                <div className="text-xs text-slate-400">
                  {club.membershipRequirements}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
