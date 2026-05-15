import { useNavigate, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Projects', path: '/projects' },
  { label: 'Reports', path: '/reports' },
  { label: 'Settings', path: '/settings' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav
      style={{ background: '#355872', fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
      className="sticky top-0 z-50 w-full"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2.5 group"
        >
          <div
            style={{ background: '#9CD5FF' }}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#355872] font-black text-sm"
          >
            S
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Strateg<span style={{ color: '#9CD5FF' }}>AI</span>
          </span>
        </button>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => {
            const active = location.pathname.startsWith(link.path)
            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                style={active ? { background: 'rgba(156,213,255,0.15)', color: '#9CD5FF' } : {}}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  active
                    ? ''
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            )
          })}
        </div>

        {/* Right side — credits + avatar */}
        <div className="flex items-center gap-3">
          <div
            style={{ background: 'rgba(156,213,255,0.15)', border: '1px solid rgba(156,213,255,0.3)' }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full"
          >
            <div style={{ background: '#9CD5FF' }} className="w-2 h-2 rounded-full" />
            <span className="text-white/80 text-xs font-medium">65 credits</span>
          </div>

          <button
            style={{ background: '#7AAACE', border: '2px solid rgba(156,213,255,0.4)' }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
          >
            T
          </button>
        </div>
      </div>

      {/* Subtle bottom border */}
      <div style={{ background: 'rgba(156,213,255,0.2)', height: '1px' }} />
    </nav>
  )
}