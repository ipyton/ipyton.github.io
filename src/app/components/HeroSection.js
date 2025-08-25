import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const HeroSection = ({ scrollToSection }) => {
  const { t } = useLanguage();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800"></div>
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-pulse">
          {t('hero.greeting')} <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">Noah</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          {t('hero.title')}
        </p>
        <p className="text-lg md:text-xl font-medium mb-8 opacity-85 tracking-wide">
          <span className="inline-block mx-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
            {t('hero.traits.versatile')}
          </span>
          <span className="inline-block mx-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
            {t('hero.traits.responsible')}
          </span>
          <span className="inline-block mx-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
            {t('hero.traits.communicative')}
          </span>
        </p>
        <p className="text-lg mb-12 opacity-80 max-w-2xl mx-auto">
          {t('hero.description')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollToSection('projects')}
            className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {t('hero.viewWork')} <ArrowRight size={20} />
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-300"
          >
            {t('hero.getInTouch')}
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={32} className="text-white" />
      </div>
    </section>
  );
};

export default HeroSection; 