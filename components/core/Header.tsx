
import React from 'react';
import { User, View, Role } from '../../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  setView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, setView }) => {
  const DiamondIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM2 10a8 8 0 1116 0 8 8 0 01-16 0zm11.293-2.293a1 1 0 011.414 0l2 2a1 1 0 01-1.414 1.414L13 9.414V14a1 1 0 11-2 0V9.414l-1.293 1.293a1 1 0 01-1.414-1.414l2-2a1 1 0 010-1.414zM8 12a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      <path d="M10 1.25l2.373 4.806L17.5 7.5l-3.95 3.848.932 5.402L10 14.534l-4.482 2.216.932-5.402L2.5 7.5l5.127-1.444L10 1.25z" />
    </svg>
  );

  return (
    <header className="bg-secondary p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-wider cursor-pointer" onClick={() => setView(user.role === Role.SUPERADMIN ? View.ADMIN_DASHBOARD : View.USER_DASHBOARD)}>
          <span className="text-accent">AI</span> Hairstyle
        </h1>
        <div className="flex items-center space-x-4">
          <button onClick={() => setView(View.BILLING)} className="flex items-center bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
            <DiamondIcon/>
            <span>{user.credits} Credits</span>
          </button>
          
          <div className="text-sm text-gray-300 hidden sm:block">{user.email}</div>
          
          <button 
            onClick={onLogout} 
            className="bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded-md transition-transform transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
