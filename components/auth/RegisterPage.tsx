
import React, { useState } from 'react';
import { register } from '../../services/authService';

interface RegisterPageProps {
  onRegisterSuccess: () => void;
  onNavigate: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await register(email, password);
      onRegisterSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to register.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-secondary rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white">
          Create Your <span className="text-accent">AI Hairstyle</span> Account
        </h1>
        <p className="text-center text-gray-400">Get 10 free credits upon registration!</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 bg-red-900/20 p-3 rounded-md text-center">{error}</p>}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-300 block mb-2">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-primary border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label htmlFor="password"className="text-sm font-medium text-gray-300 block mb-2">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-primary border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword"className="text-sm font-medium text-gray-300 block mb-2">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-primary border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-md transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? <div className="w-6 h-6 border-2 border-dashed rounded-full animate-spin border-white"></div> : 'Create Account'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Already have an account?{' '}
          <button onClick={onNavigate} className="font-medium text-accent hover:underline">
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
