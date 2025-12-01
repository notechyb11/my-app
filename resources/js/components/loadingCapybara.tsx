import React from 'react';

export default function LoadingCapybara() {
    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 transition-opacity duration-300"
            role="status"
        >
            <div className="text-center p-6 bg-green-50 rounded-lg shadow-xl border border-green-200">
                {/* Capybara Icon or simple animation (Replace with your actual visual later) */}
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500 mx-auto mb-3"></div>
                
                <p className="text-lg font-semibold text-gray-700">
                    Chef Capy is chopping the veggies...
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    Fetching delicious recipes for you!
                </p>
            </div>
        </div>
    );
}