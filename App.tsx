import React, { useEffect, useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { AdminPanel } from './components/AdminPanel';
import { ViewState } from './types';

function App() {
  const [view, setView] = useState<ViewState>(ViewState.ADMIN);
  const [referrerId, setReferrerId] = useState<string>('');

  useEffect(() => {
    // Basic routing based on URL Search Parameters
    // Example: domain.com/?ref=TAXI001 -> Landing Page
    // Example: domain.com -> Admin Panel
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');

    if (ref) {
      setReferrerId(ref);
      setView(ViewState.LANDING);
    } else {
      setView(ViewState.ADMIN);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {view === ViewState.LANDING ? (
        <LandingPage referrerId={referrerId} />
      ) : (
        <AdminPanel />
      )}
    </div>
  );
}

export default App;