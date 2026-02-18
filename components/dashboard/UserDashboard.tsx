
import React, { useState } from 'react';
import { User } from '../../types';
import { generateHairstyleImage } from '../../services/geminiService';
import { deductCredits } from '../../services/userService';

interface UserDashboardProps {
  user: User;
  onUserUpdate: () => void;
}

const GENERATION_COST = 1;

const UserDashboard: React.FC<UserDashboardProps> = ({ user, onUserUpdate }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter a description for the hairstyle.');
      return;
    }
    if (user.credits < GENERATION_COST) {
      setError(`You need at least ${GENERATION_COST} credit to generate an image. Please purchase more credits.`);
      return;
    }

    setError('');
    setIsLoading(true);
    setGeneratedImage(null);

    try {
      await deductCredits(user.id, GENERATION_COST);
      onUserUpdate();
      const imageUrl = await generateHairstyleImage(prompt);
      setGeneratedImage(imageUrl);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      // Refund credits on failure
      // Note: In a real app, this logic would be more robust and likely server-side.
      // await addCredits(user.id, GENERATION_COST);
      onUserUpdate();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side: Controls */}
        <div className="bg-secondary p-6 rounded-lg shadow-xl flex flex-col">
          <h2 className="text-2xl font-bold mb-4 text-white">Hairstyle Generator</h2>
          <p className="text-gray-400 mb-6">Describe the hairstyle you want to create. Be as specific as you like!</p>
          
          <div className="flex-grow flex flex-col space-y-4">
            <label htmlFor="prompt" className="text-sm font-medium text-gray-300">Description</label>
            <textarea
              id="prompt"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'a vibrant pink bob with sharp, asymmetrical bangs' or 'long, flowing silver hair with gentle waves'"
              className="w-full p-3 bg-primary border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent resize-none text-gray-200"
            />
          </div>

          <div className="mt-6">
            {error && <p className="text-red-400 bg-red-900/30 p-3 rounded-md text-center mb-4">{error}</p>}
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt}
              className="w-full py-4 px-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-md transition-all transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center text-lg"
            >
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-2 border-dashed rounded-full animate-spin border-white mr-3"></div>
                  Generating...
                </>
              ) : `Generate Image (Cost: ${GENERATION_COST} Credit)`}
            </button>
          </div>
        </div>

        {/* Right Side: Image Display */}
        <div className="bg-secondary p-6 rounded-lg shadow-xl flex items-center justify-center min-h-[300px] lg:min-h-0">
          {isLoading && (
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-accent mx-auto"></div>
              <p className="mt-4 text-gray-300">Creating your masterpiece...</p>
            </div>
          )}
          {!isLoading && generatedImage && (
            <img src={generatedImage} alt="Generated hairstyle" className="rounded-lg shadow-lg max-w-full max-h-full object-contain"/>
          )}
          {!isLoading && !generatedImage && (
            <div className="text-center text-gray-500">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-4">Your generated image will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
