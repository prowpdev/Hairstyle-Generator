
import React, { useState } from 'react';
import { CreditPackage, User } from '../../types';
import { addCredits } from '../../services/userService';
import { getCurrentUser } from '../../services/authService';

interface BillingPageProps {
    onCreditsUpdated: () => void;
}

const creditPackages: CreditPackage[] = [
    { id: 1, credits: 50, price: 5, name: 'Starter Pack' },
    { id: 2, credits: 120, price: 10, name: 'Creator Pack' },
    { id: 3, credits: 300, price: 20, name: 'Pro Pack' },
    { id: 4, credits: 1000, price: 50, name: 'Studio Pack' },
];

const BillingPage: React.FC<BillingPageProps> = ({ onCreditsUpdated }) => {
    const [isLoading, setIsLoading] = useState<number | null>(null);
    const [message, setMessage] = useState('');

    const handlePurchase = async (pkg: CreditPackage) => {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            setMessage('Error: You are not logged in.');
            return;
        }

        setIsLoading(pkg.id);
        setMessage('');

        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 1000));
            await addCredits(currentUser.id, pkg.credits);
            setMessage(`Successfully purchased ${pkg.credits} credits!`);
            onCreditsUpdated();
        } catch (error: any) {
            setMessage(error.message || 'Failed to purchase credits.');
        } finally {
            setIsLoading(null);
        }
    };

    const DiamondIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.25l2.373 4.806L17.5 7.5l-3.95 3.848.932 5.402L10 14.534l-4.482 2.216.932-5.402L2.5 7.5l5.127-1.444L10 1.25z" />
        </svg>
    );

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-2 text-white">Buy Credits</h1>
            <p className="text-gray-400 mb-8">Purchase credits to generate more hairstyle images.</p>

            {message && (
                <div className="mb-6 p-4 rounded-md bg-green-900/30 text-green-300 text-center">
                    {message}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {creditPackages.map((pkg) => (
                    <div key={pkg.id} className="bg-secondary rounded-lg shadow-xl p-6 flex flex-col items-center text-center transition-transform transform hover:-translate-y-2">
                        <DiamondIcon />
                        <h2 className="text-xl font-bold text-white mt-4">{pkg.name}</h2>
                        <p className="text-4xl font-extrabold text-accent my-4">{pkg.credits}</p>
                        <p className="text-gray-400 mb-6">Credits</p>
                        
                        <button
                            onClick={() => handlePurchase(pkg)}
                            disabled={isLoading === pkg.id}
                            className="w-full mt-auto py-3 px-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-md transition-all disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading === pkg.id ? (
                                <div className="w-6 h-6 border-2 border-dashed rounded-full animate-spin border-white"></div>
                            ) : `$${pkg.price}.00`}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BillingPage;
