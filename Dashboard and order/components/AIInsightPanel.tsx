
import React, { useState, useEffect } from 'react';
import { getBusinessInsights } from '../services/geminiService';
import { MOCK_STATS } from '../constants';

const AIInsightPanel: React.FC = () => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      const res = await getBusinessInsights(MOCK_STATS);
      setInsight(res || 'No insights available right now.');
      setLoading(false);
    };
    fetchInsights();
  }, []);

  return (
    <div className="bg-gradient-to-br from-primary to-orange-600 p-6 rounded-xl shadow-lg text-white mb-8 overflow-hidden relative">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-icons-round text-yellow-300">auto_awesome</span>
          <h3 className="text-lg font-bold">Gemini AI Insights</h3>
        </div>
        {loading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-white/20 rounded w-3/4"></div>
            <div className="h-4 bg-white/20 rounded w-1/2"></div>
            <div className="h-4 bg-white/20 rounded w-2/3"></div>
          </div>
        ) : (
          <div className="text-sm leading-relaxed opacity-95 prose prose-invert prose-sm max-w-none">
            {insight.split('\n').map((line, i) => (
              <p key={i} className="mb-2">{line}</p>
            ))}
          </div>
        )}
      </div>
      <span className="material-icons-round absolute -right-4 -bottom-4 text-9xl opacity-10 rotate-12 select-none">insights</span>
    </div>
  );
};

export default AIInsightPanel;
