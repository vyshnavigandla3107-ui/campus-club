import React, { useState } from 'react';
import { Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

const INTEREST_OPTIONS = [
  "Coding", "Artificial Intelligence", "Robotics", "Entrepreneurship",
  "Photography", "Music", "Sports", "Art", "Social Service"
];

const SKILL_OPTIONS = [
  "Python programming", "Problem solving", "Photography",
  "Public speaking", "Designing", "Programming", "Management", "Visual storytelling"
];

const ACTIVITY_OPTIONS = [
  "Workshops", "Competitions", "Hackathons",
  "Projects", "Exhibitions", "Sports events", "Social activities"
];

const DAY_OPTIONS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const CLUB_TYPES = ["Technical", "Cultural", "Sports", "Business", "Social Service", "Any"];

export default function ProfileForm({ initialData, onSubmit, onFillDemo }) {
  const [formData, setFormData] = useState(initialData || {
    interests: [],
    skills: [],
    preferredActivities: [],
    availableDays: [],
    timeRangeStart: "16:00",
    timeRangeEnd: "19:00",
    preferredClubType: "Technical",
    priority: "Medium"
  });

  const [validationError, setValidationError] = useState('');

  const toggleArrayItem = (field, item) => {
    setFormData(prev => {
      const current = prev[field] || [];
      const updated = current.includes(item)
        ? current.filter(i => i !== item)
        : [...current, item];
      return { ...prev, [field]: updated };
    });
    setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.interests.length === 0) {
      setValidationError("Please select at least one interest.");
      return;
    }
    if (formData.availableDays.length === 0) {
      setValidationError("Please select your available day.");
      return;
    }
    setValidationError('');
    onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-center pb-6 mb-6 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Student Profile</h2>
          <p className="text-sm text-slate-500 mt-1">
            Specify your preferences to receive matched campus club recommendations.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            onFillDemo();
          }}
          className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Auto-Fill Demo
        </button>
      </div>

      {validationError && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Interests */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-2">
            1. Student Interests <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map(interest => {
              const selected = formData.interests.includes(interest);
              return (
                <button
                  type="button"
                  key={interest}
                  onClick={() => toggleArrayItem('interests', interest)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${
                    selected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Skills / Hobbies */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-2">
            2. Skills / Hobbies
          </label>
          <div className="flex flex-wrap gap-2">
            {SKILL_OPTIONS.map(skill => {
              const selected = formData.skills.includes(skill);
              return (
                <button
                  type="button"
                  key={skill}
                  onClick={() => toggleArrayItem('skills', skill)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${
                    selected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Preferred Activities */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-2">
            3. Preferred Activities
          </label>
          <div className="flex flex-wrap gap-2">
            {ACTIVITY_OPTIONS.map(activity => {
              const selected = formData.preferredActivities.includes(activity);
              return (
                <button
                  type="button"
                  key={activity}
                  onClick={() => toggleArrayItem('preferredActivities', activity)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${
                    selected
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {activity}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Available Days */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-2">
            4. Available Days <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {DAY_OPTIONS.map(day => {
              const selected = formData.availableDays.includes(day);
              return (
                <button
                  type="button"
                  key={day}
                  onClick={() => toggleArrayItem('availableDays', day)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${
                    selected
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Available Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1">
              Start Time
            </label>
            <input
              type="time"
              value={formData.timeRangeStart}
              onChange={(e) => setFormData({ ...formData, timeRangeStart: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1">
              End Time
            </label>
            <input
              type="time"
              value={formData.timeRangeEnd}
              onChange={(e) => setFormData({ ...formData, timeRangeEnd: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 6. Preferred Club Type & 7. Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1">
              6. Preferred Club Type
            </label>
            <select
              value={formData.preferredClubType}
              onChange={(e) => setFormData({ ...formData, preferredClubType: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {CLUB_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1">
              7. Optional Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-base"
          >
            <Sparkles className="w-5 h-5" /> Find Best Clubs
          </button>
        </div>
      </form>
    </div>
  );
}
