import { useState } from 'react'
import { allLessons } from '../data/levels'
import { isDue, review } from '../lib/srs'
import { speak } from '../lib/speak'
import Ashry from '../components/Ashry'
const all = allLessons.flatMap(l => l.words)
export default function Review({ p, update }) {
  const due = all.filter(w => p.cards[w[0]] && isDue(p.cards[w[0]]))
  const [flip, setFlip] = useState(false)
  const w = due[0]
  if (!w) return <div className="page"><Ashry mood="cheer" say="مفيش مراجعة النهارده. شغل ممتاز! 🎉" /></div>
  const rate = g => { update(p => ({ ...p, xp: p.xp + 2, cards: { ...p.cards, [w[0]]: review(p.cards[w[0]], g) } })); setFlip(false) }
  return (
    <div className="page">
      <Ashry mood="happy" say={`باقي ${due.length} كلمة للمراجعة`} />
      <div className={`flip ${flip ? 'on' : ''}`} onClick={() => { setFlip(!flip); speak(w[0]) }}>
        <div><div className="f"><h1 className="en">{w[0]}</h1></div><div className="f b"><h2>{w[1]}</h2></div></div>
      </div>
      {flip && <div className="row"><button className="btn pink" onClick={() => rate(0)}>صعب</button><button className="btn" onClick={() => rate(3)}>تمام</button><button className="btn" onClick={() => rate(5)}>سهل</button></div>}
    </div>
  )
}
