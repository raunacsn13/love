import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Gift, Volume2, VolumeX, Stars, Music, Sparkles } from 'lucide-react';

// Your images - using direct Imgur image URL format
const images = [
  'https://i.imgur.com/jkp40ZN.jpg'
];

// Audio URL - using a more reliable hosting service
const audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

const loveNotes = [
  "My heart beats only for you, my love 💝",
  "Every moment with you is pure magic ✨",
  "You're the missing piece to my puzzle 💖",
  "Forever yours, eternally in love 💕",
  "You make my world complete 🌟"
];

function Snowfall() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`
          }}
        >
          {Math.random() > 0.5 ? '❄️' : '✨'}
        </div>
      ))}
    </div>
  );
}

function HeartBubbles() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`
          }}
        >
          {['💖', '💝', '💕', '💗', '💓', '🌹'][Math.floor(Math.random() * 6)]}
        </div>
      ))}
    </div>
  );
}

function LoveNote({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/30 backdrop-blur-sm p-4 rounded-lg shadow-lg"
    >
      <p className="text-lg text-pink-800 font-semibold">{text}</p>
    </motion.div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState<'welcome' | 'wishes' | 'gallery'>('welcome');
  const [currentImage, setCurrentImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNote, setCurrentNote] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const noteInterval = setInterval(() => {
      setCurrentNote(prev => (prev + 1) % loveNotes.length);
    }, 3000);
    return () => clearInterval(noteInterval);
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.log('Audio playback failed:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center p-4 overflow-hidden">
      <Snowfall />
      <HeartBubbles />
      
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        onClick={toggleAudio}
        className="fixed top-4 right-4 bg-white/30 hover:bg-white/50 p-3 rounded-full backdrop-blur-sm z-50 group"
      >
        {isPlaying ? (
          <div className="flex items-center gap-2">
            <Music className="w-6 h-6 text-pink-600 animate-bounce" />
            <span className="hidden group-hover:block text-pink-600">Playing Love Song</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <VolumeX className="w-6 h-6 text-pink-600" />
            <span className="hidden group-hover:block text-pink-600">Play Music</span>
          </div>
        )}
      </button>

      <AnimatePresence mode="wait">
        {currentPage === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <motion.div
              className="mb-8"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Heart className="w-20 h-20 text-red-500 mx-auto" />
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-pink-600 mb-8"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              💝 My Love Rukhsana 💝
            </motion.h1>
            <motion.div className="mb-8">
              <LoveNote text={loveNotes[currentNote]} />
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-500 text-white px-8 py-3 rounded-full text-xl shadow-lg hover:bg-pink-600 transition-colors"
              onClick={() => setCurrentPage('wishes')}
            >
              Open My Heart 💖
            </motion.button>
          </motion.div>
        )}

        {currentPage === 'wishes' && (
          <motion.div
            key="wishes"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center max-w-2xl"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart className="w-16 h-16 text-red-500 mx-auto mb-6" />
            </motion.div>
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-pink-600 mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              My Dearest Rukhsana 💑
            </motion.h2>
            <motion.div className="space-y-6">
              <motion.p
                className="text-xl md:text-2xl text-gray-700 mb-8 font-hindi"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                तेरी धड़कनों से है जिंदगी मेरी,<br />
                तुझे अपना बना के जीना है मुझे...<br />
                हर लम्हा तेरे साथ बिताना है मुझे,<br />
                तेरी मोहब्बत में खो जाना है मुझे... 💕
              </motion.p>
              <motion.p
                className="text-xl text-pink-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                In every heartbeat, I feel your love<br />
                In every breath, I whisper your name<br />
                You're my today and all my tomorrows<br />
                Forever in love, forever the same 💝
              </motion.p>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 text-white px-8 py-3 rounded-full text-xl shadow-lg hover:bg-red-600 transition-colors flex items-center gap-2 mx-auto mt-8"
              onClick={() => setCurrentPage('gallery')}
            >
              <Gift className="w-6 h-6" />
              Open Your Gift 🎁
            </motion.button>
          </motion.div>
        )}

        {currentPage === 'gallery' && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <div className="relative w-[300px] md:w-[600px] h-[400px] md:h-[500px] rounded-full overflow-hidden shadow-2xl">
              <motion.img
                key={currentImage}
                src={images[currentImage]}
                alt="Romantic moment"
                className="w-full h-full object-cover"
                style={{ transform: `rotate(${rotation}deg)` }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-6">
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevImage}
                    className="bg-white/30 hover:bg-white/50 text-white px-6 py-2 rounded-full backdrop-blur-sm"
                  >
                    💝 Previous
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextImage}
                    className="bg-white/30 hover:bg-white/50 text-white px-6 py-2 rounded-full backdrop-blur-sm"
                  >
                    Next 💝
                  </motion.button>
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 space-y-4"
            >
              <p className="text-2xl text-pink-600 font-bold">
                💖 Thank You for Your Love, Rukhsana 💖
              </p>
              <LoveNote text={loveNotes[currentNote]} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;