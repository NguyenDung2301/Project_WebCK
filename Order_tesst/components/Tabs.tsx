import React from 'react';
import { TabItem, TabId } from '../types';

interface TabsProps {
  tabs: TabItem[];
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200 mb-6 sticky top-16 bg-white/95 backdrop-blur-sm z-40 overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-6 sm:gap-8 min-w-max px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                isActive ? 'text-orange-500' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`ml-1 ${isActive ? 'text-orange-500' : 'text-gray-400'}`}>
                  ({tab.count})
                </span>
              )}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};