import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.title')}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://i.imgur.com/W0tBPKw.jpeg"
              alt="Profile"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
            />
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">
              {t('about.subtitle')}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t('about.description1')}
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {t('about.description2')}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">6</div>
                <div className="text-gray-600">{t('about.stats.projects')}</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">3+</div>
                <div className="text-gray-600">{t('about.stats.experience')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 