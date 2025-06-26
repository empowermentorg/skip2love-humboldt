import React from 'react';
import { LogOut, Shield } from 'lucide-react';

const AdminPanel = ({ onLogout }) => {
  return (
    <div className="page">
      <div className="text-center mb-8">
        <Shield className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
        <p className="text-gray-300">Manage your platform from here</p>
      </div>

      <div className="card space-y-4">
        <h2 className="text-xl font-semibold">Admin Controls</h2>
        <ul className="text-gray-300 space-y-2 list-disc pl-5">
          <li>View and manage user profiles</li>
          <li>Moderate flagged content</li>
          <li>Export data</li>
          <li>Upgrade users to Premium</li>
          <li>Send announcements (coming soon)</li>
        </ul>
        <button
          onClick={onLogout}
          className="btn-secondary flex items-center justify-center gap-2 mt-4"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
