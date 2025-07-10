"use client";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";

type Particle = {
  width: number;
  height: number;
  top: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
};

export default function ForexSignalPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showVideo, setShowVideo] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const closeVideo = () => {
    setShowVideo(false);
  };

  const handleVolumeToggle = () => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      if (videoRef.current) {
        videoRef.current.muted = newMuted;
        if (!newMuted) {
          videoRef.current.play(); // Ensure video plays with sound
        }
      }
      return newMuted;
    });
  };

  useEffect(() => {
    // Auto-hide video after 6 seconds
    const videoTimer = setTimeout(() => {
      setShowVideo(false);
    }, 18000);

    return () => clearTimeout(videoTimer);
  }, []);

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Only runs on client
    const newParticles = Array.from({ length: 30 }).map(() => ({
      width: Math.random() * 10 + 5,
      height: Math.random() * 10 + 5,
      top: Math.random() * 100,
      left: Math.random() * 100,
      animationDuration: Math.random() * 10 + 10,
      animationDelay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      quote:
        "Thanks to your signals, I've grown my account 2X in 3 months. The daily analysis is incredibly helpful!",
      author: "Trader M.K.",
    },
    {
      id: 2,
      quote:
        "Finally found signals I can trust. 83% accuracy is no joke - my portfolio has never looked better.",
      author: "Investor J.S.",
    },
    {
      id: 3,
      quote:
        "The Telegram community is gold. Live trade discussions have taken my skills to the next level.",
      author: "Beginner Trader",
    },
  ];

  // Stats data
  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "12K+", label: "Group Members" },
    { value: "83%", label: "Signal Accuracy" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <>
      {showVideo && (
        <div className="video-overlay">
          <div className="video-container">
            <button className="video-close" onClick={closeVideo}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted={isMuted}
              loop
              className="intro-video"
              style={{
                aspectRatio: "9/16",
                width: "100%",
                maxWidth: "360px",
                borderRadius: "1.5rem",
                boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
              }}
            >
              <source
                src="https://res.cloudinary.com/dkfmaqtpy/video/upload/v1752029776/great-mega-video_gdpbu2.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div
              className="video-placeholder"
              style={{ cursor: "pointer" }}
              onClick={handleVolumeToggle}
            >
              <div className="video-play-icon">
                {isMuted ? (
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03zm2.5 0c0 2.76-1.69 5.1-4.1 6.03l1.45 1.45c2.54-1.17 4.15-3.71 4.15-6.48s-1.61-5.31-4.15-6.48l-1.45 1.45C18.31 6.9 20 9.24 20 12z" />
                  </svg>
                ) : (
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03zm3.5 0c0 2.76-1.69 5.1-4.1 6.03l1.45 1.45c2.54-1.17 4.15-3.71 4.15-6.48s-1.61-5.31-4.15-6.48l-1.45 1.45C18.31 6.9 20 9.24 20 12zm-9-7v14c0 .55-.45 1-1 1s-1-.45-1-1V5c0-.55.45-1 1-1s1 .45 1 1zm-4 4v6c0 .55.45 1 1 1h3v-8H8c-.55 0-1 .45-1 1z" />
                  </svg>
                )}
              </div>
              <p> {isMuted ? (<span>Click for Sound</span>) : (<span></span>)}</p>
            </div>
          </div>
        </div>
      )}

      <Head>
        <title>FX Signals Pro | Premium Forex Trading Signals</title>
        <meta
          name="description"
          content="Join our 10,000+ Telegram community getting daily Forex signals with 83% accuracy."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-blue-900 opacity-20">
            {/* Particle animation background */}
            <div className="absolute inset-0 overflow-hidden">
              {particles.map((p, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-blue-400 opacity-30"
                  style={{
                    width: `${p.width}px`,
                    height: `${p.height}px`,
                    top: `${p.top}%`,
                    left: `${p.left}%`,
                    animation: `float ${p.animationDuration}s linear infinite`,
                    animationDelay: `${p.animationDelay}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 container mx-auto md:px-6 py-20 text-center">
            <div className="backdrop-blur-lg bg-blue-900/30 border border-blue-700/50 rounded-2xl py-8 md:px-8 px-4 max-w-4xl mx-auto shadow-2xl shadow-blue-900/30">
              <div className="animate-fade-in-up">
                <div className="relative w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-tr from-blue-400 via-blue-600 to-blue-900 p-1 shadow-2xl hover:scale-105 hover:shadow-blue-400/40 transition-all duration-300 group">
                  <div className="w-full h-full rounded-full bg-blue-950 flex items-center justify-center overflow-hidden">
                    <Image
                      src="https://res.cloudinary.com/dkfmaqtpy/image/upload/v1752026334/great-mega_df41ye.jpg"
                      width={96}
                      height={96}
                      alt="Trader Avatar"
                      className="object-cover w-full h-full group-hover:brightness-110 transition-all duration-300"
                      priority
                    />
                  </div>
                  {/* Optional: Add a glowing ring */}
                  <span className="absolute inset-0 rounded-full ring-4 ring-blue-300/40 pointer-events-none animate-pulse-slow"></span>
                </div>
                <h1 className="font-gotham-condensed text-4xl md:text-6xl py-4 font-extrabold mb-4 bg-clip-text text-blue bg-gradient-to-r from-black via-blue-200 to-black drop-shadow-lg animate-fade-in-up animate-gradient-move">
                  Profit{" "}
                  <span className="relative inline-block px-4 py-1 mx-1 rounded-full bg-blue-900 text-white shadow-lg border-2 border-blue-400 ring-2 ring-blue-300/40 animate-pulse-slow">
                    Smarter
                    <span className="absolute -inset-1 rounded-full bg-blue-400/20 blur-lg -z-10"></span>
                  </span>
                  <div>
                  Trade <span className="text-blue-200">With Me</span>

                  </div>
                </h1>
                <p className="text-sm md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Join my 10,000+ Telegram community getting daily Forex signals
                  with 83% accuracy.
                </p>
                {/* Social Media Icons Row */}
                <div className="flex justify-center gap-4 mb-8 pt-4">
                  {/* Telegram */}
                  <a
                    href="#"
                    aria-label="Telegram"
                    className="hover:scale-110 transition-transform"
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.144.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.534.26l.213-3.053 5.56-5.023c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.962-.924c-.64-.203-.658-.64.135-.954l11.57-4.46c.538-.196 1.006.128.832.941z" />
                    </svg>
                  </a>
                  {/* TikTok */}
                  <a
                    href="#"
                    aria-label="TikTok"
                    className="hover:scale-110 transition-transform"
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-pink-400 hover:text-pink-300"
                    >
                      <path d="M12.75 2h2.25v12.25a2.25 2.25 0 1 1-2.25-2.25V9.5a4.75 4.75 0 1 0 4.75 4.75V7.25h-2.25V2z" />
                    </svg>
                  </a>
                  {/* Facebook */}
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="hover:scale-110 transition-transform"
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-blue-600 hover:text-blue-400"
                    >
                      <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="hover:scale-110 transition-transform"
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-pink-500 hover:text-pink-300"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  {/* Discord */}
                  <a
                    href="#"
                    aria-label="Discord"
                    className="hover:scale-110 transition-transform"
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      <path d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3.1a.074.074 0 0 0-.079.037c-.34.607-.719 1.396-.984 2.013a18.267 18.267 0 0 0-5.456 0 12.51 12.51 0 0 0-.997-2.013.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.369a.069.069 0 0 0-.032.027C.533 9.09-.32 13.579.099 18.021a.082.082 0 0 0 .031.056c2.104 1.547 4.13 2.488 6.102 3.104a.077.077 0 0 0 .084-.027c.472-.65.892-1.34 1.245-2.065a.076.076 0 0 0-.041-.104c-.662-.251-1.293-.549-1.899-.892a.077.077 0 0 1-.008-.127c.127-.096.254-.197.373-.299a.074.074 0 0 1 .077-.01c3.967 1.813 8.27 1.813 12.199 0a.073.073 0 0 1 .078.009c.12.102.246.203.373.299a.077.077 0 0 1-.006.127 12.298 12.298 0 0 1-1.9.892.076.076 0 0 0-.04.105c.36.724.78 1.414 1.244 2.064a.076.076 0 0 0 .084.028c1.978-.616 4.004-1.557 6.107-3.104a.077.077 0 0 0 .03-.055c.5-5.177-.838-9.637-3.548-13.625a.061.061 0 0 0-.03-.028zM8.02 15.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.334-.955 2.419-2.156 2.419zm7.974 0c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.334-.946 2.419-2.156 2.419z" />
                    </svg>
                  </a>
                  {/* Slack */}
                  <a
                    href="#"
                    aria-label="Slack"
                    className="hover:scale-110 transition-transform"
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-green-400 hover:text-green-300"
                    >
                      <path d="M5.1 15.9a2.1 2.1 0 1 1-2.1 2.1h2.1zm1.05 0a2.1 2.1 0 1 1 4.2 0v5.25a2.1 2.1 0 1 1-4.2 0zm2.1-10.8a2.1 2.1 0 1 1-2.1-2.1v2.1zm0 1.05a2.1 2.1 0 1 1 0 4.2H3.15a2.1 2.1 0 1 1 0-4.2zm10.8 2.1a2.1 2.1 0 1 1 2.1-2.1v2.1zm-1.05 0a2.1 2.1 0 1 1-4.2 0V3.15a2.1 2.1 0 1 1 4.2 0zm-2.1 10.8a2.1 2.1 0 1 1 2.1 2.1h-2.1zm0-1.05a2.1 2.1 0 1 1 0-4.2h5.25a2.1 2.1 0 1 1 0 4.2zm-7.35-7.35a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0zm13.65 0a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0zm-13.65 13.65a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0zm13.65 0a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0z" />
                    </svg>
                  </a>
                  {/* Twitch */}
                  <a
                    href="#"
                    aria-label="Twitch"
                    className="hover:scale-110 transition-transform"
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-purple-500 hover:text-purple-300"
                    >
                      <path d="M2.857 0L0 4.286v17.143h5.143V24h3.429l3.429-2.571h4.286L24 16.286V0H2.857zm18.286 15.429l-2.571 2.571h-4.286l-3.429 2.571v-2.571H2.857V1.714h18.286v13.715zM7.714 6.857h1.714v5.143H7.714V6.857zm5.143 0h1.714v5.143h-1.714V6.857z" />
                    </svg>
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="#telegram"
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full font-semibold text-white shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-white"
                      aria-hidden="true"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.144.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.534.26l.213-3.053 5.56-5.023c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.962-.924c-.64-.203-.658-.64.135-.954l11.57-4.46c.538-.196 1.006.128.832.941z" />
                    </svg>
                    Join Telegram
                  </a>
                  {/* Modern View My Broker Button */}
                  <a
                    href="#broker"
                    className="group relative inline-flex items-center justify-center px-8 py-3 bg-blue-950/60 border-2 border-transparent rounded-full font-semibold text-blue-100 shadow-lg transition-all duration-300 overflow-hidden hover:scale-105 hover:border-blue-400 hover:shadow-blue-400/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    style={{ minWidth: 220 }}
                  >
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm z-0"></span>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-blue-400 mr-3 z-10 group-hover:animate-pulse"
                      aria-hidden="true"
                    >
                      <rect
                        x="2"
                        y="8"
                        width="6"
                        height="16"
                        rx="2"
                        fill="#2196F3"
                      />
                      <rect
                        x="10"
                        y="4"
                        width="6"
                        height="24"
                        rx="2"
                        fill="#42A5F5"
                      />
                      <rect
                        x="18"
                        y="10"
                        width="6"
                        height="12"
                        rx="2"
                        fill="#90CAF9"
                      />
                      <rect
                        x="26"
                        y="14"
                        width="4"
                        height="8"
                        rx="2"
                        fill="#E3F2FD"
                      />
                    </svg>
                    <span className="z-10">View My Broker</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Floating coins animation */}
          <div className="absolute top-1/4 left-10 animate-float">
            <div className="w-12 h-12 rounded-full bg-yellow-400/20 border border-yellow-400/30 shadow-lg"></div>
          </div>
          <div className="absolute top-2/3 right-20 animate-float-delay">
            <div className="w-8 h-8 rounded-full bg-yellow-400/20 border border-yellow-400/30 shadow-lg"></div>
          </div>
          <div className="absolute bottom-1/4 left-1/3 animate-float-delay-2">
            <div className="w-10 h-10 rounded-full bg-yellow-400/20 border border-yellow-400/30 shadow-lg"></div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-950 opacity-70 -z-10"></div>
          <div className="absolute inset-0 bg-[url('/chart-bg.jpg')] bg-cover bg-center opacity-20 -z-20 blur-sm"></div>

          <div className="container mx-auto md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
                Who Am I?
              </span>
            </h2>

            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="lg:w-1/2 backdrop-blur-md bg-blue-900/30 border border-blue-700/50 rounded-2xl py-8 md:px-8 px-4 shadow-xl shadow-blue-900/20 hover:shadow-blue-700/30 transition-all duration-500">
                <h3 className="text-2xl font-semibold mb-4 text-blue-100">
                  Professional Forex Trader & Analyst
                </h3>
                <p className="text-blue-100 mb-4">
                  With over 5 years of professional trading experience,
                  I&apos;ve developed a proven system for identifying
                  high-probability trade setups in the Forex market.
                </p>
                <p className="text-blue-100 mb-4">
                  My approach combines technical analysis, price action, and
                  market sentiment to deliver signals with an 83% success rate
                  across major currency pairs.
                </p>
                <p className="text-blue-100">
                  I&apos;m passionate about helping traders of all levels
                  improve their results through clear, actionable signals and
                  educational content.
                </p>
              </div>

              <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="backdrop-blur-md bg-blue-900/30 border border-blue-700/50 rounded-xl p-6 text-center shadow-lg hover:shadow-blue-700/30 transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-3xl font-bold text-blue-200 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-blue-300 text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Telegram CTA Section */}
        <section id="telegram" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 to-blue-900 -z-10"></div>
          <div className="absolute inset-0 opacity-20 -z-20">
            {/* Animated chart lines */}
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,50 L20,45 L40,55 L60,40 L80,60 L100,50"
                stroke="rgba(100,200,255,0.3)"
                strokeWidth="0.5"
                fill="none"
              />
              <path
                d="M0,60 L20,65 L40,55 L60,70 L80,50 L100,60"
                stroke="rgba(100,200,255,0.3)"
                strokeWidth="0.5"
                fill="none"
              />
            </svg>
          </div>

          <div className="container mx-auto md:px-6">
            <div className="max-w-4xl mx-auto backdrop-blur-md bg-blue-900/30 border border-blue-700/50 rounded-2xl py-8 md:px-8 px-4 shadow-2xl shadow-blue-900/30 overflow-hidden">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3 flex justify-center">
                  <div className="bg-blue-800/50 p-6 rounded-full border-2 border-blue-600/50">
                    <svg
                      className="w-16 h-16 text-blue-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.144.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.534.26l.213-3.053 5.56-5.023c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.962-.924c-.64-.203-.658-.64.135-.954l11.57-4.46c.538-.196 1.006.128.832.941z" />
                    </svg>
                  </div>
                </div>

                <div className="md:w-2/3 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-100">
                    Daily Signals. Live Charts. Real Wins.
                  </h2>
                  <p className="text-blue-200 mb-6">
                    Join my exclusive Telegram channel for daily trade setups,
                    live market analysis, and a community of traders sharing
                    real results.
                  </p>
                  <a
                    href="https://t.me/yourchannel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full font-semibold text-white shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 animate-pulse-slow"
                  >
                    Join My Signal Channel Now
                  </a>
                </div>
              </div>

              {/* Telegram message preview */}
              <div className="mt-8 backdrop-blur-sm bg-blue-800/30 border border-blue-700/50 rounded-xl p-4 max-w-md mx-auto">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-700"></div>
                  <div className="text-sm text-blue-200 font-medium">
                    FX Signals Pro
                  </div>
                  <div className="text-xs text-blue-400 ml-auto">12:45 PM</div>
                </div>
                <div className="text-sm text-blue-100 mb-2">
                  <span className="font-semibold text-blue-300">
                    EURUSD BUY
                  </span>{" "}
                  at 1.0825
                  <br />
                  Stop Loss: 1.0790
                  <br />
                  Take Profit: 1.0880
                  <br />
                  <span className="text-green-400">
                    ✅ 83% accuracy on this setup
                  </span>
                </div>
                <div className="text-xs text-blue-400">3.5K members online</div>
              </div>
            </div>
          </div>
        </section>

        {/* Affiliate Broker Section */}
        <section id="broker" className="md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-950/70 -z-10"></div>
          <div className="absolute inset-0 bg-[url('/trading-platform.jpg')] bg-cover bg-center opacity-20 -z-20 blur-sm"></div>

          <div className="container mx-auto md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
                Start Trading With My Trusted Broker
              </span>
            </h2>

            <div className="max-w-4xl mx-auto backdrop-blur-md bg-blue-900/30 border border-blue-700/50 rounded-2xl py-8 md:px-8 px-4 shadow-2xl shadow-blue-900/30 overflow-hidden hover:border-blue-500/70 transition-all duration-500">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3 flex justify-center">
                  <div className="bg-blue-800/30 p-4 rounded-xl border border-blue-700/50">
                    <Image
                      src="https://res.cloudinary.com/dkfmaqtpy/image/upload/v1752027330/expertoption_dcze8n.png"
                      width={96}
                      height={96}
                      alt="Trader Avatar"
                      className="object-cover w-full h-full group-hover:brightness-110 transition-all duration-300"
                      priority
                    />
                  </div>
                </div>

                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-4 text-blue-100">
                    Premium Trading Conditions
                  </h3>
                  <p className="text-blue-200 mb-6">
                    I exclusively use and recommend ExpertOption for their tight
                    spreads, fast execution, and reliable withdrawals. Get
                    access to:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <li className="flex items-center text-blue-200">
                      <svg
                        className="w-4 h-4 mr-2 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      1:500 Leverage
                    </li>
                    <li className="flex items-center text-blue-200">
                      <svg
                        className="w-4 h-4 mr-2 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      No Deposit Fees
                    </li>
                    <li className="flex items-center text-blue-200">
                      <svg
                        className="w-4 h-4 mr-2 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      24/7 Support
                    </li>
                    <li className="flex items-center text-blue-200">
                      <svg
                        className="w-4 h-4 mr-2 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      $50 Welcome Bonus
                    </li>
                  </ul>
                  <a
                    href="https://broker.com/your-affiliate-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full font-semibold text-white shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-950/80 -z-10"></div>
          <div className="absolute inset-0 bg-[url('/forex-chart.jpg')] bg-cover bg-center opacity-10 -z-20 blur-sm"></div>

          <div className="container mx-auto md:px-6 px-3">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
                Results From The Community
              </span>
            </h2>

            <div className="max-w-4xl mx-auto relative h-64">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 backdrop-blur-md bg-blue-900/30 border border-blue-700/50 rounded-2xl py-8 md:px-8 px-4 shadow-xl transition-opacity duration-1000 ${
                    index === activeTestimonial ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <svg
                    className="w-8 h-8 text-blue-400 mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-lg text-blue-100 mb-4">
                    {testimonial.quote}
                  </p>
                  <p className="text-blue-300 font-medium">
                    — {testimonial.author}
                  </p>
                </div>
              ))}

              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === activeTestimonial
                        ? "bg-blue-400 w-6"
                        : "bg-blue-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Email Capture Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-900 -z-10"></div>

          <div className="container mx-auto md:px-6 px-3">
            <div className="max-w-2xl mx-auto backdrop-blur-md bg-blue-900/30 border border-blue-700/50 rounded-2xl p-8 shadow-2xl shadow-blue-900/30 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-100">
                Don&apos;t Miss The Next Big Trade
              </h2>
              <p className="text-blue-200 mb-6">
                Get alerts and updates straight to your inbox. Join thousands of
                traders getting exclusive content.
              </p>

              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="flex-grow px-2 py-3 bg-blue-900/50 border border-blue-700/50 rounded-lg text-blue-100 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-grow px-2 py-3 bg-blue-900/50 border border-blue-700/50 rounded-lg text-blue-100 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-6 py-3 mr-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg font-semibold text-white hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
                >
                  Get Updates
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-blue-950/90 border-t border-blue-900 py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <div className="text-xl font-bold text-blue-200 mb-2">
                  FX Signals Pro
                </div>
                <p className="text-sm text-blue-400 max-w-md">
                  Providing high-quality Forex trading signals since 2018. Join
                  our community of profitable traders today.
                </p>
              </div>

              <div className="flex flex-col items-center md:items-end">
                <div className="flex gap-4 mb-4">
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-200 transition-colors duration-300"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.144.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.534.26l.213-3.053 5.56-5.023c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.962-.924c-.64-.203-.658-.64.135-.954l11.57-4.46c.538-.196 1.006.128.832.941z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-200 transition-colors duration-300"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-200 transition-colors duration-300"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                </div>

                <p className="text-xs text-blue-500 text-center md:text-right">
                  This is not financial advice. Trade at your own risk. Past
                  performance is not indicative of future results.
                </p>
              </div>
            </div>

            <div className="border-t border-blue-900 mt-8 pt-8 text-center text-sm text-blue-500">
              © {new Date().getFullYear()} FX Signals Pro. All rights reserved.
              <br />
              <a
                href="https://metavatechhq.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-200 transition-colors duration-300 underline mt-2 inline-block"
              >
                Powered by Metavatech
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes float-delay {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes float-delay-2 {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes pulse-slow {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          70% {
            transform: scale(1.02);
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }

        .drop-shadow-lg {
          text-shadow: 0 4px 24px rgba(59, 130, 246, 0.25), 0 1.5px 0 #1e3a8a;
        }

        @keyframes gradient-move {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 3s linear infinite alternate;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delay {
          animation: float-delay 7s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-float-delay-2 {
          animation: float-delay-2 5s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s infinite;
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
