"use client";

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

const TestI18nPage = () => {
  const { t, currentLanguage, changeLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🌍 國際化測試頁面
          </h1>
          <p className="text-xl text-gray-600">
            測試中英文切換功能
          </p>
        </div>

        {/* Language Switcher */}
        <div className="flex justify-center mb-8">
          <LanguageSwitcher 
            currentLanguage={currentLanguage}
            onLanguageChange={changeLanguage}
            isScrolled={false}
          />
        </div>

        {/* Current Language Display */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">當前語言 / Current Language</h2>
          <p className="text-lg">
            <span className="font-medium">中文:</span> {currentLanguage === 'zh' ? '简体中文' : 'English'}
          </p>
          <p className="text-lg">
            <span className="font-medium">English:</span> {currentLanguage === 'en' ? 'English' : '简体中文'}
          </p>
        </div>

        {/* Translation Examples */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Navigation */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">導航欄 / Navigation</h3>
            <div className="space-y-2">
              <p><strong>首頁:</strong> {t('nav.home')}</p>
              <p><strong>關於:</strong> {t('nav.about')}</p>
              <p><strong>技能:</strong> {t('nav.skills')}</p>
              <p><strong>專案:</strong> {t('nav.projects')}</p>
              <p><strong>聯絡:</strong> {t('nav.contact')}</p>
            </div>
          </div>

          {/* Hero Section */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">英雄區段 / Hero Section</h3>
            <div className="space-y-2">
              <p><strong>問候:</strong> {t('hero.greeting')}</p>
              <p><strong>標題:</strong> {t('hero.title')}</p>
              <p><strong>特質:</strong> {t('hero.traits.versatile')}, {t('hero.traits.responsible')}, {t('hero.traits.communicative')}</p>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">關於我 / About</h3>
            <div className="space-y-2">
              <p><strong>標題:</strong> {t('about.title')}</p>
              <p><strong>副標題:</strong> {t('about.subtitle')}</p>
              <p><strong>統計:</strong> {t('about.stats.projects')}, {t('about.stats.experience')}</p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">技能 / Skills</h3>
            <div className="space-y-2">
              <p><strong>標題:</strong> {t('skills.title')}</p>
              <p><strong>副標題:</strong> {t('skills.subtitle')}</p>
            </div>
          </div>

          {/* Projects Section */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">專案 / Projects</h3>
            <div className="space-y-2">
              <p><strong>標題:</strong> {t('projects.title')}</p>
              <p><strong>副標題:</strong> {t('projects.subtitle')}</p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">聯絡 / Contact</h3>
            <div className="space-y-2">
              <p><strong>標題:</strong> {t('contact.title')}</p>
              <p><strong>副標題:</strong> {t('contact.subtitle')}</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">表單 / Form</h3>
            <div className="space-y-2">
              <p><strong>姓名:</strong> {t('form.name')}</p>
              <p><strong>郵件:</strong> {t('form.email')}</p>
              <p><strong>訊息:</strong> {t('form.message')}</p>
              <p><strong>發送:</strong> {t('form.sendMessage')}</p>
            </div>
          </div>

          {/* Music Player */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">音樂播放器 / Music Player</h3>
            <div className="space-y-2">
              <p><strong>正在播放:</strong> {t('music.nowPlaying')}</p>
              <p><strong>暫停音樂:</strong> {t('music.pauseMusic')}</p>
              <p><strong>播放音樂:</strong> {t('music.playMusic')}</p>
            </div>
          </div>

          {/* Carousel */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">圖片輪播 / Carousel</h3>
            <div className="space-y-2">
              <p><strong>上一張:</strong> {t('carousel.previousImage')}</p>
              <p><strong>下一張:</strong> {t('carousel.nextImage')}</p>
              <p><strong>暫停幻燈片:</strong> {t('carousel.pauseSlideshow')}</p>
            </div>
          </div>
        </div>

        {/* Language Switching Instructions */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8 border border-blue-200">
          <h3 className="text-xl font-semibold mb-4 text-blue-900">使用說明 / Instructions</h3>
          <div className="text-blue-800 space-y-2">
            <p>• 點擊右上角的語言切換器來切換語言</p>
            <p>• Click the language switcher in the top right to change languages</p>
            <p>• 語言偏好會自動保存到本地存儲</p>
            <p>• Language preference is automatically saved to local storage</p>
            <p>• 所有文本都會即時更新</p>
            <p>• All text updates immediately</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestI18nPage;
