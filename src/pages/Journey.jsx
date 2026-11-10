import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { levels, allLessons } from '../data/levels'
import { levelOf } from '../lib/progress'
import Ashry from '../components/Ashry'
export default function Journey({ p }) {
  const next = allLessons.find(l => !p.done.includes(l.id))
  return (
    <div className="page">
      <div className="hud"><div className="chip">🔥 {p.streak}</div><div className="chip">⭐ {p.xp} XP</div><div className="chip">Lv {levelOf(p.xp)}</div></div>
      <Ashry mood="wave" say={next ? `يلا نكمّل: ${next.title}` : 'خلصت كل المتاح! محتوى جديد جاي قريب 🎉'} />
      {next && <Link to={`/lesson/${next.id}`}><button className="btn" style={{ width: '100%' }}>كمّل الرحلة</button></Link>}
      {levels.map((lv, i) => (
        <motion.section key={lv.id} className="world" style={{ '--c': lv.color }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2><span>{lv.emoji}</span><span className="en">{lv.id}</span> {lv.name}</h2>
          <div className="path">
            {lv.lessons.length === 0 && <div className="card" style={{ color: 'var(--muted)' }}>قريباً…</div>}
            {lv.lessons.map((l, j) => {
              const done = p.done.includes(l.id), isNext = next?.id === l.id
              const cls = `stop ${done ? 'done' : ''} ${isNext ? 'next' : ''} ${!done && !isNext ? 'locked' : ''}`
              return <div key={l.id} style={{ alignSelf: j % 2 ? 'flex-end' : 'flex-start', marginInline: 30 }}>
                <Link className={cls} to={done || isNext ? `/lesson/${l.id}` : '#'}>{done ? '✓' : j + 1}<small>{l.title}</small></Link>
              </div>
            })}
          </div>
        </motion.section>
      ))}
    </div>
  )
}
