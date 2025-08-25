import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, ZoomIn } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ImageCarousel = ({ images, alt, color }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { t } = useLanguage();
  
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, isAutoPlaying]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  if (images.length === 1) {
    return (
      <div className="relative w-full h-64 bg-black overflow-hidden">
        <img
          src={images[0]}
          alt={alt}
          className="w-full h-full object-contain transition-transform duration-700 hover:scale-105"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 bg-black overflow-hidden group">
      {/* Main image */}
      <div className="relative w-full h-full">
        <img
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          className="w-full h-full object-contain transition-all duration-700 hover:scale-105"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none"></div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 hover:scale-110 shadow-lg"
        aria-label={t('carousel.previousImage')}
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 hover:scale-110 shadow-lg"
        aria-label={t('carousel.nextImage')}
      >
        <ChevronRight size={20} />
      </button>

      {/* Auto-play toggle */}
      <button
        onClick={toggleAutoPlay}
        className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 hover:scale-110 shadow-lg"
        aria-label={isAutoPlaying ? t('carousel.pauseSlideshow') : t('carousel.playSlideshow')}
      >
        {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>

      {/* Image indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`relative w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
              ? 'bg-white scale-125 shadow-lg'
              : 'bg-white/50 hover:bg-white/75 hover:scale-110'
              }`}
            aria-label={`${t('carousel.goToImage')} ${index + 1}`}
          >
            {index === currentIndex && (
              <div className="absolute inset-0 rounded-full bg-white animate-ping"></div>
            )}
          </button>
        ))}
      </div>

      {/* Image counter */}
      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md text-white text-sm px-3 py-1 rounded-full font-medium">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Progress bar */}
      {isAutoPlaying && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div
            className="h-full bg-gradient-to-r from-white to-white/80 transition-all duration-75 ease-linear"
            style={{
              width: `${((currentIndex + 1) / images.length) * 100}%`
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel; 