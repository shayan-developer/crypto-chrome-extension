import React from 'react';

interface TabBarProps {
  activeTab: 'top' | 'favorites';
  onTabChange: (tab: 'top' | 'favorites') => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b border-gray-800">
      <button
        onClick={() => onTabChange('top')}
        className={`flex-1 py-2 px-4 text-center transition-colors ${
          activeTab === 'top'
            ? 'text-white border-b-2 border-blue-500'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        ارزهای برتر
      </button>
      <button
        onClick={() => onTabChange('favorites')}
        className={`flex-1 py-2 px-4 text-center transition-colors ${
          activeTab === 'favorites'
            ? 'text-white border-b-2 border-blue-500'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        مورد علاقه‌ها
      </button>
    </div>
  );
}; 