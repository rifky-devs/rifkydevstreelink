import { useEffect, useState, useMemo } from 'react'
import { FaInstagram, FaTiktok, FaDiscord } from 'react-icons/fa'


function App() {
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [copiedPill, setCopiedPill] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Generate 400 total stars in 3 layers for organic movement
  const stars1 = useMemo(() => Array.from({ length: 150 }, (_, i) => ({
    id: `1-${i}`,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: 20 + Math.random() * 30,
    delay: Math.random() * -60,
    baseOpacity: Math.random() * 0.7 + 0.2,
    animation: 'animate-drift-right'
  })), [])

  const stars2 = useMemo(() => Array.from({ length: 150 }, (_, i) => ({
    id: `2-${i}`,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: 25 + Math.random() * 35,
    delay: Math.random() * -70,
    baseOpacity: Math.random() * 0.7 + 0.15,
    animation: 'animate-drift-left'
  })), [])

  const stars3 = useMemo(() => Array.from({ length: 100 }, (_, i) => ({
    id: `3-${i}`,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 0.8,
    duration: 30 + Math.random() * 40,
    delay: Math.random() * -80,
    baseOpacity: Math.random() * 0.7 + 0.25,
    animation: 'animate-drift-up'
  })), [])

  const allStars = [...stars1, ...stars2, ...stars3]

  const getStarOpacity = (starLeft, starTop, baseOpacity) => {
    if (typeof window === 'undefined') return baseOpacity

    const starX = (starLeft / 100) * window.innerWidth
    const starY = (starTop / 100) * window.innerHeight

    const distance = Math.sqrt(
      Math.pow(starX - mousePos.x, 2) +
      Math.pow(starY - mousePos.y, 2)
    )

    const effectRadius = 250
    if (distance > effectRadius) return baseOpacity

    const proximity = 1 - (distance / effectRadius)
    const brightnessBoost = proximity * 0.6

    return Math.min(baseOpacity + brightnessBoost, 1.0)
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center"
      style={{
        background: 'linear-gradient(135deg, #15194a 0%, #291d63 35%, #461f85 70%, #6c1f96 100%)'
      }}>

      {/* Dynamic Star Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {allStars.map(star => (
          <div
            key={star.id}
            className={`absolute rounded-full bg-white ${star.animation}`}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: getStarOpacity(star.left, star.top, star.baseOpacity),
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              transition: 'opacity 0.3s ease',
              willChange: 'transform, opacity'
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 w-full max-w-[380px]">

        {/* Profile Avatar */}
        <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-purple-400/50 to-pink-500/50 p-1 shadow-2xl">
          <div className="w-full h-full rounded-full bg-[#291d63] flex items-center justify-center">
            <span className="text-5xl">👨‍💻</span>
          </div>
        </div>

        {/* Username */}
        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Rifky Devs</h1>

        {/* Bio */}
        <p className="text-gray-200/70 text-center text-sm mb-10 max-w-[320px] leading-relaxed font-medium">
          Full Stack Developer | Music Producer<br />Creative Developer & Tech Enthusiast
        </p>

        {/* Main Card Container with Overlapping Pill */}
        <div className="relative w-full mt-4">
          {/* Social Icons Overlapping Pill */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-white/10 backdrop-blur-xl px-8 py-3 rounded-full border border-white/20 shadow-2xl z-20">
            <a href="https://www.instagram.com/1oneky1/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-purple-600 shadow-lg hover:scale-110 active:scale-95 transition-all">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.tiktok.com/@whenwherewhyidie" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow-lg hover:scale-110 active:scale-95 transition-all">
              <FaTiktok size={18} />
            </a>
            <div className="relative">
              {/* Chat Bubble for Pill */}
              <div className={`absolute -top-16 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-none ${copiedPill ? 'opacity-100 scale-100 -translate-y-2' : 'opacity-0 scale-95 translate-y-2'}`}>
                <div className="bg-[#5865F2] text-white text-[11px] font-bold px-4 py-2 rounded-xl shadow-2xl whitespace-nowrap relative">
                  ✅ Username udah dicopy nih! Silakan add di DC yaaaw~
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#5865F2]"></div>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText("baddreameveryday");
                  setCopiedPill(true);
                  setTimeout(() => setCopiedPill(false), 2000);
                }}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#5865F2] shadow-lg hover:scale-110 active:scale-95 transition-all">
                <FaDiscord size={20} />
              </button>
            </div>
          </div>

          {/* Card Utama */}
          <main className="bg-white rounded-[3rem] p-8 pt-14 shadow-2xl w-full min-h-[300px]">
            {!isMenuOpen ? (
              <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Main Link - Opens Menu */}
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 text-white font-bold py-4 rounded-2xl hover:scale-[1.02] hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-purple-500/40 border border-white/20">
                  ⭐ rifky's project
                </button>

                <div className="space-y-8 mt-4">
                  {/* Mobile App Section */}
                  <div>
                    <h2 className="text-center font-bold text-indigo-950 mb-4 text-xs tracking-widest uppercase flex items-center justify-center gap-2">
                      <span>📱</span> MOBILE APP <span>📱</span>
                    </h2>
                    <button className="w-full bg-white border-2 border-gray-100 text-purple-900 font-bold py-3.5 rounded-2xl hover:bg-gray-50 hover:border-purple-100 hover:text-purple-600 hover:scale-[1.01] active:scale-[0.98] transition-all shadow-sm hover:shadow-md">
                      UPlay ( Coming Soon )
                    </button>
                  </div>

                  {/* Komunitas Section */}
                  <div>
                    <h2 className="text-center font-bold text-indigo-950 mb-4 text-xs tracking-widest uppercase flex items-center justify-center gap-2">
                      <span>👥</span> KOMUNITAS <span>👥</span>
                    </h2>
                    <div className="flex flex-col gap-3">
                      <a href="https://rifkydevs.my.id/" target="_blank" rel="noopener noreferrer" className="block w-full bg-white border-2 border-gray-100 text-purple-900 font-bold py-3.5 rounded-2xl hover:bg-gray-50 hover:border-purple-100 hover:text-purple-600 hover:scale-[1.01] active:scale-[0.98] transition-all shadow-sm hover:shadow-md text-center">
                        Web
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
                {/* Header Menu */}
                <div className="flex items-center gap-3 mb-2">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-900"><path d="m15 18-6-6 6-6" /></svg>
                  </button>
                  <h3 className="text-xl font-bold text-purple-950 tracking-tight">rifky menu</h3>
                </div>

                {/* Sub Menu Links */}
                <div className="flex flex-col gap-4">
                  <a
                    href="https://rifkydevs.my.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-purple-500/80 backdrop-blur-sm text-white font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 text-center">
                    <span>⭐</span> Portofolio
                  </a>
                  {/* Bisa tambah menu lain di sini nanti */}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default App