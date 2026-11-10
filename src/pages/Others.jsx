import { levelOf, exportBackup, emptyProgress } from '../lib/progress'
import Ashry from '../components/Ashry'
export const Games = () => <div className="page"><Ashry mood="cheer" say="الألعاب (Wordle, Hangman, مطابقة) في المرحلة الجاية!" /></div>
export function Me({ p, update }) {
  const restore = (e) => {
    const f = e.target.files[0]; if (!f) return
    f.text().then(t => update(() => ({ ...emptyProgress(), ...JSON.parse(t) }))).catch(() => alert('الملف مش صالح'))
  }
  return (
    <div className="page">
      <h1>ملفي</h1>
      <div className="card" style={{ margin: '14px 0' }}>🔥 {p.streak} يوم متتالي<br />⭐ {p.xp} XP — المستوى {levelOf(p.xp)}<br />📚 {Object.keys(p.cards).length} كلمة اتعلمت</div>
      <div className="card">الهدف اليومي: {[10, 20, 30].map(m => <button key={m} className="btn" style={{ padding: '6px 14px', margin: 4, opacity: p.dailyGoal === m ? 1 : .45 }} onClick={() => update(x => ({ ...x, dailyGoal: m }))}>{m} د</button>)}</div>
      <div className="card" style={{ marginTop: 14 }}>
        <p style={{ marginBottom: 10 }}>تقدمك محفوظ على جهازك. خد نسخة احتياطية عشان ما تضيعش لو مسحت بيانات المتصفح.</p>
        <button className="btn" onClick={() => exportBackup(p)}>تصدير نسخة</button>
        <label className="btn pink" style={{ marginInlineStart: 8, cursor: 'pointer', display: 'inline-block' }}>استيراد<input type="file" accept=".json" hidden onChange={restore} /></label>
      </div>
    </div>
  )
}
