import React from 'react';
import { CryptoData } from '../types/crypto';

interface CryptoCardProps {
  crypto: CryptoData;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const CryptoCard: React.FC<CryptoCardProps> = ({
  crypto,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800 hover:bg-gray-800 transition-colors">
      <div className="flex items-center gap-2 rtl">
        <img
          src={crypto.image}
          alt={crypto.name}
          className="w-8 h-8 rounded-full"
        />
        <div className="text-right">
          <div className="font-medium">{crypto.name}</div>
          <div className="text-sm text-gray-400">{crypto.symbol.toUpperCase()}</div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-left">
          <div className="font-medium">
            ${crypto.current_price.toLocaleString()}
          </div>
          <div className={`text-sm ${crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {crypto.price_change_percentage_24h.toFixed(2)}%
          </div>
        </div>
        
        <button
          onClick={() => onToggleFavorite(crypto.id)}
          className="p-2 text-gray-400 hover:text-yellow-500 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}; 