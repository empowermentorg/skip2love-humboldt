import React, { useState } from 'react';
import { Search, Heart } from 'lucide-react';
import ProfileCard from './ProfileCard';

const Dashboard = ({ profiles, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.id !== currentUser?.id &&
      (
        profile.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.location?.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    if (a.subscription_tier === 'premium' && b.subscription_tier !== 'premium') return -1;
    if (b.subscription_tier === 'premium' && a.subscription_tier !== 'premium') return 1;
    return 0;
  });

  return (
    <div className="page">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4 gradient-text">Discover Love</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name, interests, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input flex-1 mb-0"
          />
          <button className="btn-secondary">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {sortedProfiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} currentUser={currentUser} />
        ))}
      </div>

      {sortedProfiles.length === 0 && (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-xl text-gray-400">No profiles found</p>
          <p className="text-gray-500">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
