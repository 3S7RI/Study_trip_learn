import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { loadProgress, saveProgress, touchStreak } from './lib/progress'
import BottomNav from './components/BottomNav'
import Journey from './pages/Journey'
import Lesson from './pages/Lesson'
import Review from './pages/Review'
import { Games, Me } from './pages/Others'

export default function App() {
  const [p, setP] = useState(() => touchStreak(loadProgress()))
  const update = (fn) => setP(old => { const n = fn(old); saveProgress(n); return n })
  const ctx = { p, update }
  return (
    <>
      <div className="stars" />
      <Routes>
        <Route path="/" element={<Journey {...ctx} />} />
        <Route path="/lesson/:id" element={<Lesson {...ctx} />} />
        <Route path="/review" element={<Review {...ctx} />} />
        <Route path="/games" element={<Games />} />
        <Route path="/me" element={<Me {...ctx} />} />
      </Routes>
      <BottomNav />
    </>
  )
}
