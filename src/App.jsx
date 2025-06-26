import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Heart, User, LogOut, Home } from 'lucide-react';

import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import ProfilePage from './components/ProfilePage';
import AdminPanel from './components/AdminPanel';
import './index.css';

// 🔐 Supabase credentials
const supabaseUrl = 'https://efpeuaqgijrbxvlbjgga.supabase.co';
const supabaseKey = 'YOUR_ACTUAL_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Skip2LoveApp() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    loadProfiles();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setUser(session.user);
      if (session.user.email === 'admin123@gmail.com') {
        setIsAdmin(true);
        setCurrentPage('admin');
      } else {
        setCurrentPage('dashboard');
      }
    }
    setLoading(false);
  };

  const loadProfiles = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    setProfiles(data || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
    setCurrentPage('welcome');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-pink-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={() => setCurrentPage('auth')} />;
      case 'auth':
        return (
          <AuthForm
            onSuccess={() => {
              checkAuth();
              loadProfiles();
            }}
          />
        );
      case 'dashboard':
        return <Dashboard profiles={profiles} currentUser={user} />;
      case 'profile':
        return <ProfilePage user={user} onUpdate={loadProfiles} />;
      case 'admin':
        return <AdminPanel onLogout={handleLogout} />;
      default:
        return <WelcomeScreen onGetStarted={() => setCurrentPage('auth')} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
      {user && !isAdmin && (
        <div className="navbar">
          <div
            className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            <Home className="w-6 h-6" />
            <span>Discover</span>
          </div>
          <div
            className={`nav-item ${currentPage === 'profile' ? 'active' : ''}`}
            onClick={() => setCurrentPage('profile')}
          >
            <User className="w-6 h-6" />
            <span>Profile</span>
          </div>
          <div className="nav-item" onClick={handleLogout}>
            <LogOut className="w-6 h-6" />
            <span>Logout</span>
          </div>
        </div>
      )}
    </div>
  );
}

// 💖 Welcome screen component
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
