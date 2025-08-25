import React from 'react';
import { Globe } from 'lucide-react';

const LanguageSwitcher = ({ currentLanguage, onLanguageChange, isScrolled }) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '简体中文' }
  ];

  return (
    <div className="relative group">
      <button
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 border-2 ${
          isScrolled
            ? 'text-gray-800 hover:text-blue-700 hover:bg-blue-50 border-gray-200 hover:border-blue-200'
            : 'text-white hover:bg-white/25 backdrop-blur-sm border-white/30 hover:border-white/50'
        }`}
        onClick={() => onLanguageChange(currentLanguage === 'en' ? 'zh' : 'en')}
      >
        <Globe size={18} />
        <span className="text-sm font-medium">
          {languages.find(lang => lang.code === currentLanguage)?.name}
        </span>
      </button>
      
      {/* Language dropdown tooltip */}
      <div className="absolute right-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
        <div className={`px-3 py-2 rounded-lg text-sm font-medium ${
          isScrolled
            ? 'bg-white text-gray-800 shadow-lg border border-gray-200'
            : 'bg-black/80 text-white backdrop-blur-sm border border-white/20'
        }`}>
          {languages.find(lang => lang.code === currentLanguage)?.name}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
