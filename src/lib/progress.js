const KEY = 'study-trip-v1'
export const emptyProgress = () => ({ xp: 0, streak: 0, lastDay: null, dailyGoal: 15, done: [], cards: {}, mistakes: [] })
export function loadProgress() {
  try { return { ...emptyProgress(), ...JSON.parse(localStorage.getItem(KEY) || '{}') } } catch { return emptyProgress() }
}
export function saveProgress(d) { try { localStorage.setItem(KEY, JSON.stringify(d)) } catch {} }
export function touchStreak(p) {
  const today = new Date().toISOString().slice(0, 10)
  if (p.lastDay === today) return p
  const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10)
  return { ...p, streak: p.lastDay === y ? p.streak + 1 : 1, lastDay: today }
}
export const levelOf = (xp) => Math.floor(Math.sqrt(xp / 50)) + 1
export function exportBackup(p) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([JSON.stringify(p)], { type: 'application/json' }))
  a.download = 'study-trip-backup.json'; a.click()
}
