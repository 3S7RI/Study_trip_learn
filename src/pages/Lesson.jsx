import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { allLessons } from '../data/levels'
import { speak } from '../lib/speak'
import { review } from '../lib/srs'
import Ashry from '../components/Ashry'
export default function Lesson({ update }) {
  const { id } = useParams(), nav = useNavigate()
  const lesson = allLessons.find(l => l.id === id)
  const [i, setI] = useState(0), [flip, setFlip] = useState(false)
  if (!lesson) return <div className="page">الدرس مش موجود</div>
  const w = lesson.words[i]
  function rate(g) {
    update(p => ({ ...p, cards: { ...p.cards, [w[0]]: review(p.cards[w[0]], g) } }))
    setFlip(false)
    if (i + 1 < lesson.words.length) return setI(i + 1)
    update(p => ({ ...p, xp: p.xp + 20, done: [...new Set([...p.done, lesson.id])] }))
    nav('/')
  }
  return (
    <div className="page">
      <h1>{lesson.title}</h1>
      <Ashry mood="happy" say={`كلمة ${i + 1} من ${lesson.words.length} — اضغط على الكارت`} />
      <div className={`flip ${flip ? 'on' : ''}`} onClick={() => { setFlip(!flip); speak(w[0]) }}>
        <div>
          <div className="f"><h1 className="en" style={{ fontSize: '2.6rem' }}>{w[0]}</h1></div>
          <div className="f b"><div><h2>{w[1]}</h2><p className="en" style={{ marginTop: 8 }}>{w[2]}</p></div></div>
        </div>
      </div>
      <div className="row"><button className="btn pink" onClick={() => speak(w[2], .8)}>🔊 الجملة</button></div>
      {flip && <div className="row"><button className="btn pink" onClick={() => rate(0)}>صعب</button><button className="btn" onClick={() => rate(3)}>تمام</button><button className="btn" onClick={() => rate(5)}>سهل</button></div>}
    </div>
  )
}
