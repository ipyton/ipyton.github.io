import React, { useState, useEffect, useRef } from 'react';
import { Disc, Music, VolumeX, Volume1, Volume2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [showMusicInfo, setShowMusicInfo] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const audioRef = useRef(null);
  const { t } = useLanguage();

  // Song information
  const songInfo = {
    title: "Ambient Reverb (MP3)",
    artist: "Noah Chen",
    albumArt: "/file.svg" // Using existing file.svg as album art
  };

  // Show notification when music state changes
  useEffect(() => {
    if (isPlaying) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying]);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio('/all-reverb.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };
  
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={16} />;
    if (volume < 0.5) return <Volume1 size={16} />;
    return <Volume2 size={16} />;
  };

  return (
    <>
      {/* Music Playing Notification */}
      {showNotification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-full flex items-center gap-3 animate-fadeIn z-50">
          <Disc size={18} className="animate-spin" />
          <span>{t('music.nowPlaying')} {songInfo.title} - {songInfo.artist}</span>
        </div>
      )}
      
      {/* Music Player Button and Controls */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
        {/* Music Info Tooltip */}
        {showMusicInfo && (
          <div className="mb-2 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg flex items-center gap-3 transition-all duration-300 transform origin-bottom-right animate-fadeIn">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <img 
                src={songInfo.albumArt} 
                alt="Album Art" 
                className={`w-8 h-8 ${isPlaying ? 'animate-pulse' : ''}`}
              />
            </div>
            <div>
              <div className="font-medium text-gray-900">{songInfo.title}</div>
              <div className="text-sm text-gray-600">{songInfo.artist}</div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          {/* Volume Control */}
          {showVolumeControl && (
            <div className="bg-white/90 backdrop-blur-md px-3 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300">
              <button className="text-gray-600 hover:text-blue-600 transition-colors">
                {getVolumeIcon()}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 accent-purple-600"
              />
            </div>
          )}
          
          {/* Music Toggle Button */}
          <button 
            onClick={toggleMusic}
            onMouseEnter={() => {
              setShowVolumeControl(true);
              setShowMusicInfo(true);
            }}
            onMouseLeave={() => {
              setShowVolumeControl(false);
              setShowMusicInfo(false);
            }}
            className={`p-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center ${isPlaying ? 'animate-pulse' : ''}`}
            aria-label={isPlaying ? t('music.pauseMusic') : t('music.playMusic')}
          >
            {isPlaying ? (
              <>
                <Disc size={24} className="animate-spin" />
                <span className="sr-only">{t('music.pauseMusic')}</span>
              </>
            ) : (
              <>
                <Music size={24} />
                <span className="sr-only">{t('music.playMusic')}</span>
              </>
            )}
            
            {/* Visual beat indicator when playing */}
            {isPlaying && (
              <div className="absolute -inset-1 bg-white/30 rounded-full animate-ping opacity-75"></div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer; 