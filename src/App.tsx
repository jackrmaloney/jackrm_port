// src/App.tsx
import { ProfileCard } from './components/profile/ProfileCard';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <div className="bg-[#F9FAFB] px-4 py-8">
      <ProfileCard />
      <Analytics />
    </div>
  );
}

export default App;