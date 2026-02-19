
import React, { useState } from 'react';
import { User, HairstyleTemplate, Gender } from '../../types';
import { hairstyleTemplates } from '../../constants';
import { generateHairstyleImage } from '../../services/geminiService';
import { deductCredits } from '../../services/userService';

interface UserDashboardProps {
  user: User;
  onUserUpdate: () => void;
}

const GENERATION_COST = 1;

const UserDashboard: React.FC<UserDashboardProps> = ({ user, onUserUpdate }) => {
    const [prompt, setPrompt] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState<HairstyleTemplate | null>(null);
  const [filter, setFilter] = useState<Gender | 'ALL'>('ALL');
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState('');

  const filteredTemplates = hairstyleTemplates.filter(t => filter === 'ALL' || t.gender === filter);

  const handleTemplateSelect = (template: HairstyleTemplate | null) => {
    if (selectedTemplate?.id === template?.id) {
      setSelectedTemplate(null);
      setPrompt('');
    } else {
      setSelectedTemplate(template);
      setPrompt(template?.prompt || '');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("Image size should not exceed 5MB.");
        return;
      }
      setReferenceImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const removeImage = () => {
    setReferenceImage(null);
    setImagePreview(null);
    const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = '';
    }
  };

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

      const imagePayloads: { base64Data: string; mimeType: string; }[] = [];

      // NOTE: The template image URL from picsum cannot be directly converted to base64 on the client
      // due to CORS policy. A server-side proxy would be needed for a full implementation.
      // For now, only the user-uploaded image will be sent as a reference.

      if (referenceImage && imagePreview) {
        const [header, base64Data] = imagePreview.split(',');
        const mimeType = header.match(/:(.*?);/)?.[1] || referenceImage.type;
        if (base64Data && mimeType) {
            imagePayloads.push({ base64Data, mimeType });
        }
      }
      
      const imageUrl = await generateHairstyleImage(prompt, imagePayloads);
      setGeneratedImage(imageUrl);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      // Note: In a real app, refund logic would be more robust.
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
          <p className="text-gray-400 mb-6">Describe the hairstyle you want to create. You can also upload a reference photo.</p>
          
          <div className="flex-grow flex flex-col space-y-6">
            <div>
                            <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-300">Choose a Hairstyle Template</label>
                <div className="flex space-x-2">
                  <button onClick={() => setFilter('ALL')} className={`px-3 py-1 text-xs rounded-full ${filter === 'ALL' ? 'bg-accent text-white' : 'bg-gray-700 text-gray-300'}`}>All</button>
                  <button onClick={() => setFilter(Gender.WOMAN)} className={`px-3 py-1 text-xs rounded-full ${filter === Gender.WOMAN ? 'bg-accent text-white' : 'bg-gray-700 text-gray-300'}`}>Women</button>
                  <button onClick={() => setFilter(Gender.MAN)} className={`px-3 py-1 text-xs rounded-full ${filter === Gender.MAN ? 'bg-accent text-white' : 'bg-gray-700 text-gray-300'}`}>Men</button>
                </div>
              </div>
              <div className="mt-2 flex space-x-4 overflow-x-auto pb-4 -mx-6 px-6">
                {filteredTemplates.map((template) => (
                  <button 
                    key={template.id} 
                    onClick={() => handleTemplateSelect(template)} 
                    className={`flex-shrink-0 text-center p-2 rounded-lg transition-all bg-primary hover:bg-gray-800 ${selectedTemplate?.id === template.id ? 'ring-2 ring-offset-2 ring-offset-secondary ring-accent' : ''}`}>
                    <img referrerPolicy='no-referrer' src={template.imageUrl} alt={template.name} className="w-28 h-28 object-cover rounded-md mx-auto"/>
                    <p className="mt-2 text-xs font-medium text-gray-300 w-28 truncate">{template.name}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="prompt" className="text-sm font-medium text-gray-300">Description</label>
              <textarea
                id="prompt"
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Select a template or describe a hairstyle..."
                className="mt-2 w-full p-3 bg-primary border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent resize-none text-gray-200 disabled:bg-gray-800 disabled:text-gray-400"
                disabled={!!selectedTemplate}
              />
            </div>
            
            <div>
              <label htmlFor="imageUpload" className="text-sm font-medium text-gray-300">Upload Your Photo (Optional)</label>
              <div className="mt-2 flex items-center justify-center gap-4">
                {selectedTemplate && (
                  <div className="text-center flex-shrink-0">
                    <img referrerPolicy='no-referrer' src={selectedTemplate.imageUrl} alt="Selected template" className="h-32 w-32 object-cover rounded-md border-2 border-accent" />
                    <p className="text-xs mt-2 text-gray-400">Template Reference</p>
                  </div>
                )}
                <div className="flex-grow flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {imagePreview ? (
                    <div>
                        <img src={imagePreview} alt="Reference preview" className="mx-auto h-32 w-32 object-cover rounded-md" />
                        <button onClick={removeImage} className="mt-2 text-sm text-red-400 hover:text-red-300">Remove Image</button>
                    </div>
                  ) : (
                    <>
                      <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-400">
                        <label htmlFor="imageUpload" className="relative cursor-pointer bg-secondary rounded-md font-medium text-accent hover:text-accent-hover focus-within:outline-none">
                          <span>Upload a file</span>
                          <input id="imageUpload" name="imageUpload" type="file" className="sr-only" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</p>
                    </>
                  )}
                </div>
                </div>
            </div>
          </div>
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
