import React from 'react';

const LoadingProduct = () => {
    return (
        <div className="animate-pulse bg-white rounded-md overflow-hidden shadow-sm">
            <div className="aspect-square bg-gray-300"></div>

            <div className="text-center space-y-2 p-2">
                
                {/* Price */}
                <div className="flex gap-2 justify-center mt-1">
                    <div className="h-4 w-16 bg-gray-300 rounded"></div>
                    <div className="h-4 w-12 bg-gray-200 rounded"></div>
                </div>

                {/* Product Name */}
                <div className="flex justify-center">
                    <div className="h-5 w-32 bg-gray-300 rounded-2xl"></div>
                </div>

                {/* Description */}
                <div className="space-y-1 flex flex-col items-center">
                    <div className="h-3 w-40 bg-gray-200 rounded"></div>
                    <div className="h-3 w-28 bg-gray-200 rounded"></div>
                </div>

            </div>
        </div>
    );
};

export default LoadingProduct;