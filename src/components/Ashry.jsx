import { motion } from 'framer-motion'
const mouth = {
  wave: <path d="M90 134 Q100 144 110 134" fill="none" stroke="#5a2332" strokeWidth="3" strokeLinecap="round" />,
  happy: <path d="M87 131 Q100 152 113 131 Z" fill="#7a1f3d" stroke="#5a2332" strokeWidth="2.5" strokeLinejoin="round" />,
  cheer: <ellipse cx="100" cy="138" rx="12" ry="11" fill="#7a1f3d" stroke="#5a2332" strokeWidth="2.5" />,
  sad: <path d="M90 142 Q100 130 110 142" fill="none" stroke="#5a2332" strokeWidth="3" strokeLinecap="round" />,
}
const brows = { sad: ['M64 92 L88 84', 'M136 92 L112 84'], default: ['M66 86 L88 84', 'M134 86 L112 84'] }
function Eye({ x }) {
  return (
    <g className="blink" style={{ transformOrigin: `${x}px 108px` }}>
      <ellipse cx={x} cy="108" rx="13" ry="16" fill="#12183a" />
      <ellipse cx={x} cy="111" rx="9.5" ry="11.5" fill="url(#iris)" />
      <circle cx={x + 4} cy="102" r="4.5" fill="#fff" /><circle cx={x - 4} cy="116" r="2" fill="#fff" />
    </g>
  )
}
export function AshryArt({ mood = 'wave', size = 120 }) {
  const b = brows[mood] || brows.default
  const arm = mood === 'wave' || mood === 'cheer'
  return (
    <svg viewBox="0 0 200 215" width={size} height={size * 1.07} role="img" aria-label="عشري">
      <defs>
        <radialGradient id="iris" cx=".5" cy=".3"><stop offset="0" stopColor="#8ff3ff" /><stop offset="1" stopColor="#1f6bff" /></radialGradient>
        <linearGradient id="jacket" x1="0" x2="1"><stop offset="0" stopColor="#8b5cff" /><stop offset="1" stopColor="#ff3df2" /></linearGradient>
      </defs>
      {/* حقيبة وجسم */}
      <rect x="52" y="150" width="96" height="60" rx="26" fill="#1d2552" />
      <path d="M44 215 Q46 160 100 156 Q154 160 156 215Z" fill="url(#jacket)" />
      <path d="M76 158 Q100 176 124 158 L130 172 Q100 192 70 172Z" fill="#22e4ff" />
      {/* الدراع */}
      {arm
        ? <motion.g style={{ originX: '150px', originY: '175px' }} animate={{ rotate: [0, -22, 0, -22, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <path d="M148 178 Q172 150 170 118" stroke="url(#jacket)" strokeWidth="20" strokeLinecap="round" fill="none" /><circle cx="170" cy="112" r="11" fill="#ffd9b8" /></motion.g>
        : <path d="M150 180 Q166 200 160 215" stroke="url(#jacket)" strokeWidth="20" strokeLinecap="round" fill="none" />}
      {/* الشعر الخلفي */}
      <path d="M40 112 Q30 40 100 26 Q170 40 160 112 Q150 70 100 66 Q50 70 40 112Z" fill="#161040" />
      {/* الوجه */}
      <ellipse cx="100" cy="112" rx="53" ry="52" fill="#ffd9b8" />
      <ellipse cx="46" cy="116" rx="7" ry="10" fill="#f6c19b" /><ellipse cx="154" cy="116" rx="7" ry="10" fill="#f6c19b" />
      {/* الغرة المدببة */}
      <path d="M44 100 Q40 44 100 34 Q160 44 156 100 L146 66 L134 90 L118 58 L102 88 L84 58 L70 90 L56 66Z" fill="#161040" />
      <path d="M96 40 L102 62 L112 42" stroke="#22e4ff" strokeWidth="4" fill="none" strokeLinecap="round" />
      {b.map((d, i) => <path key={i} d={d} stroke="#161040" strokeWidth="4" strokeLinecap="round" />)}
      <Eye x={78} /><Eye x={122} />
      <ellipse cx="64" cy="128" rx="9" ry="5" fill="#ff8fb8" opacity=".6" /><ellipse cx="136" cy="128" rx="9" ry="5" fill="#ff8fb8" opacity=".6" />
      {mouth[mood]}
    </svg>
  )
}
export default function Ashry({ mood = 'wave', say }) {
  return (
    <div className="mascot">
      <motion.div className="pic" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2.4 }}><AshryArt mood={mood} size={104} /></motion.div>
      {say && <div className="bubble">{say}</div>}
    </div>
  )
}
