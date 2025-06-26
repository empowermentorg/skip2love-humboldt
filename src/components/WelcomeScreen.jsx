import React from 'react';
import { Heart } from 'lucide-react';

const WelcomeScreen = ({ onGetStarted }) => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <div className="text-center max-w-md">
      <div className="mb-8">
        <Heart className="w-24 h-24 mx-auto mb-4 text-pink-400" />
        <h1 className="text-4xl font-bold mb-2 gradient-text">Skip2Love</h1>
        <p className="text-xl text-purple-300">Humboldt</p>
      </div>

      <p className="text-lg mb-8 text-gray-300">
        Find your perfect match in beautiful Humboldt County. Connect with local singles who share your interests and values.
      </p>

      <button className="btn-primary w-full text-lg py-4" onClick={onGetStarted}>
        Get Started 💕
      </button>

      <p className="text-sm text-gray-400 mt-4">
        Join thousands of singles in your area
      </p>
    </div>
  </div>
);

export default WelcomeScreen;
