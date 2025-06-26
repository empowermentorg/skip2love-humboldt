import React, { useState, useEffect } from 'react';
import { Plus, Crown } from 'lucide-react';
import { supabase } from '../supabaseClient';
import ProfilePhotoUploader from './ProfilePhotoUploader';

const ProfilePage = ({ user, onUpdate }) => {
  const [profile, setProfile] = useState({
    full_name: '',
    age: '',
    bio: '',
    location: '',
    interests: [],
    contact_email: '',
    contact_phone: '',
    subscription_tier: 'free',
    photos: []
  });
  const [loading, setLoading] = useState(false);
  const [newInterest, setNewInterest] = useState('');

  useEffect(() => {
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (data) {
      setProfile(data);
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
          ...profile,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      alert('Profile updated successfully!');
      onUpdate();
    } catch (error) {
      alert('Error updating profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addInterest = () => {
    if (newInterest.trim() && !profile.interests.includes(newInterest.trim())) {
      setProfile({
        ...profile,
        interests: [...profile.interests, newInterest.trim()]
      });
      setNewInterest('');
    }
  };

  const removeInterest = (interest) => {
    setProfile({
      ...profile,
      interests: profile.interests.filter(i => i !== interest)
    });
  };

  const isPremium = profile.subscription_tier === 'premium';

  return (
    <div className="page">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold gradient-text">My Profile</h1>
        <div className="flex items-center gap-2">
          {isPremium && <Crown className="w-6 h-6 text-yellow-400" />}
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            isPremium
              ? 'bg-yellow-500 text-black'
              : 'bg-gray-600 text-white'
          }`}>
            {isPremium ? 'Premium' : 'Free'}
          </span>
        </div>
      </div>

      {/* 🔼 Uploader Card */}
      <div className="card mb-6">
        <h3 className="text-xl font-bold mb-4">Upload Profile Photo</h3>
        <ProfilePhotoUploader />
      </div>

      <div className="card mb-6">
        <h3 className="text-xl font-bold mb-4">Photo Gallery</h3>
        <div className={isPremium ? 'photo-grid-premium' : 'photo-grid-free'}>
          {Array.from({ length: isPremium ? 6 : 4 }).map((_, index) => (
            <div key={index} className="photo-slot">
              {profile.photos?.[index] ? (
                <img src={profile.photos[index]} alt={`Profile ${index + 1}`} />
              ) : (
                <Plus className="w-8 h-8 text-gray-400" />
              )}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-2">
          {isPremium ? '3x2 grid • Premium features' : '2x2 grid • Upgrade for more photos'}
        </p>
      </div>

      <div className="card space-y-4">
        <h3 className="text-xl font-bold">Basic Information</h3>

        <input
          type="text"
          placeholder="Full Name"
          value={profile.full_name}
          onChange={(e) => setProfile({...profile, full_name: e.target.value})}
          className="input"
        />

        <input
          type="number"
          placeholder="Age"
          value={profile.age}
          onChange={(e) => setProfile({...profile, age: e.target.value})}
          className="input"
        />

        <input
          type="text"
          placeholder="Location (e.g., Eureka, CA)"
          value={profile.location}
          onChange={(e) => setProfile({...profile, location: e.target.value})}
          className="input"
        />

        <textarea
          placeholder="Tell us about yourself..."
          value={profile.bio}
          onChange={(e) => setProfile({...profile, bio: e.target.value})}
          className="input"
          rows="4"
        />

        <div>
          <h4 className="font-semibold mb-2">Interests</h4>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Add an interest"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              className="input flex-1"
              onKeyPress={(e) => e.key === 'Enter' && addInterest()}
            />
            <button onClick={addInterest} className="btn-primary">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, index) => (
              <span
                key={index}
                className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm cursor-pointer"
                onClick={() => removeInterest(interest)}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        <input
          type="email"
          placeholder="Contact Email"
          value={profile.contact_email}
          onChange={(e) => setProfile({...profile, contact_email: e.target.value})}
          className="input"
        />

        <input
          type="tel"
          placeholder="Contact Phone"
          value={profile.contact_phone}
          onChange={(e) => setProfile({...profile, contact_phone: e.target.value})}
          className="input"
        />

        <button
          onClick={updateProfile}
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
