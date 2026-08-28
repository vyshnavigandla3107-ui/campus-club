import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ProfileForm from './components/ProfileForm';
import ResultsPage from './components/ResultsPage';
import ComparisonModal from './components/ComparisonModal';
import { demoStudentProfile } from './data/demoProfile';

export default function App() {
  const [activeView, setActiveView] = useState('landing'); // 'landing', 'form', 'results'
  const [profile, setProfile] = useState(demoStudentProfile);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonClubs, setComparisonClubs] = useState(null);

  const handleFetchRecommendations = async (submittedProfile) => {
    setIsLoading(true);
    setProfile(submittedProfile);
    try {
      const response = await fetch('http://localhost:5000/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submittedProfile)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to fetch recommendations');
      }

      const data = await response.json();
      setResults(data);
      setActiveView('results');
    } catch (error) {
      console.error('Error calculating recommendations:', error);
      alert('Could not connect to recommendation engine backend. Ensure Express backend is running on port 5000.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemoAndSubmit = () => {
    setProfile(demoStudentProfile);
    setActiveView('form');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <Navbar onNavigate={(view) => setActiveView(view)} activeTab={activeView} />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading && (
          <div className="text-center py-24 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-600 font-semibold">Running Campus Agent Engine...</p>
          </div>
        )}

        {!isLoading && activeView === 'landing' && (
          <LandingPage
            onStart={() => setActiveView('form')}
            onLoadDemo={handleFillDemoAndSubmit}
          />
        )}

        {!isLoading && activeView === 'form' && (
          <ProfileForm
            initialData={profile}
            onSubmit={handleFetchRecommendations}
            onFillDemo={() => setProfile({ ...demoStudentProfile })}
          />
        )}

        {!isLoading && activeView === 'results' && results && (
          <ResultsPage
            results={results}
            onBack={() => setActiveView('form')}
            onCompare={(clubs) => setComparisonClubs(clubs)}
          />
        )}
      </main>

      {comparisonClubs && (
        <ComparisonModal
          clubs={comparisonClubs}
          onClose={() => setComparisonClubs(null)}
        />
      )}

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        Campus Agent – Student Club Recommendation System | Academic Project Submission
      </footer>
    </div>
  );
}
