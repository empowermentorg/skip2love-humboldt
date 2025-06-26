import React from 'react';
import { Crown, Mail, Phone, Camera } from 'lucide-react';

const ProfileCard = ({ profile, currentUser }) => {
  const isPremium = profile.subscription_tier === 'premium';
  const isOwnProfile = profile.id === currentUser?.id;
  const gridClass = isPremium ? 'photo-grid-premium' : 'photo-grid-free';
  const cardClass = `card ${isPremium ? 'premium-card' : ''}`;

  return (
    <div className={cardClass}>
      {isPremium && (
        <div className="premium-badge">
          <Crown className="w-5 h-5" />
        </div>
      )}

      <div className={gridClass}>
        {Array.from({ length: isPremium ? 6 : 4 }).map((_, index) => (
          <div key={index} className="photo-slot">
            {profile.photos?.[index] ? (
              <img src={profile.photos[index]} alt={`${profile.full_name} ${index + 1}`} />
            ) : (
              <Camera className="w-6 h-6 text-gray-400" />
            )}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{profile.full_name || 'Anonymous'}</h3>
          {profile.age && <span className="text-gray-400">{profile.age} years old</span>}
        </div>

        {profile.location && (
          <p className="text-gray-300 flex items-center gap-2">📍 {profile.location}</p>
        )}

        {profile.bio && (
          <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
        )}

        {profile.interests && profile.interests.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, index) => (
              <span
                key={index}
                className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        )}

        {!isOwnProfile && (
          <div className="space-y-2 pt-4 border-t border-gray-600">
            <div className={`space-y-2 ${!isPremium ? 'hidden-contact' : ''}`}>
              {profile.contact_email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{profile.contact_email}</span>
                </div>
              )}
              {profile.contact_phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{profile.contact_phone}</span>
                </div>
              )}
            </div>

            {!isPremium && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Contact info hidden</span>
                <button className="contact-unlock">Upgrade to Premium</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
