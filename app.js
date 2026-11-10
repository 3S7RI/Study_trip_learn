import { levels } from './data.js'
const KEY = 'study-trip-v1', DAY = 864e5
const empty = () => ({ xp: 0, streak: 0, lastDay: null, dailyGoal: 15, done: [], cards: {} })
const load = () => { try { return { ...empty(), ...JSON.parse(localStorage.getItem(KEY) || '{}') } } catch { return empty() } }
let p = load()
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(p)) } catch {} }
;(() => { // streak
  const t = new Date().toISOString().slice(0, 10); if (p.lastDay === t) return
  const y = new Date(Date.now() - DAY).toISOString().slice(0, 10)
  p.streak = p.lastDay === y ? p.streak + 1 : 1; p.lastDay = t; save()
})()
const lvl = xp => Math.floor(Math.sqrt(xp / 50)) + 1
const all = levels.flatMap(l => l.lessons)
const words = all.flatMap(l => l.words)
function speak(t, r = .9) {
  if (!('speechSynthesis' in window)) return
  speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = 'en-US'; u.rate = r; speechSynthesis.speak(u)
}
function sm2(c = { ease: 2.5, interval: 0, reps: 0 }, g) { // التكرار المتباعد
  let { ease, interval, reps } = c
  if (g < 3) { reps = 0; interval = 1 } else { reps++; interval = reps === 1 ? 1 : reps === 2 ? 3 : Math.round(interval * ease) }
  ease = Math.max(1.3, ease + .1 - (5 - g) * (.08 + (5 - g) * .02))
  return { ease, interval, reps, due: Date.now() + interval * DAY }
}
const dueWords = () => words.filter(w => p.cards[w[0]] && p.cards[w[0]].due <= Date.now())

/* ---------- عشري ---------- */
const S = '#5a2332'
const mouths = {
  wave: `<path d="M90 134 Q100 144 110 134" fill="none" stroke="${S}" stroke-width="3" stroke-linecap="round"/>`,
  happy: `<path d="M87 131 Q100 152 113 131Z" fill="#7a1f3d" stroke="${S}" stroke-width="2.5" stroke-linejoin="round"/>`,
  cheer: `<ellipse cx="100" cy="138" rx="12" ry="11" fill="#7a1f3d" stroke="${S}" stroke-width="2.5"/>`,
  sad: `<path d="M90 142 Q100 130 110 142" fill="none" stroke="${S}" stroke-width="3" stroke-linecap="round"/>`,
}
const eye = x => `<g class="blink" style="transform-origin:${x}px 108px"><ellipse cx="${x}" cy="108" rx="13" ry="16" fill="#12183a"/><ellipse cx="${x}" cy="111" rx="9.5" ry="11.5" fill="url(#iris)"/><circle cx="${x + 4}" cy="102" r="4.5" fill="#fff"/><circle cx="${x - 4}" cy="116" r="2" fill="#fff"/></g>`
function art(mood, size = 104) {
  const sad = mood === 'sad', arm = mood === 'wave' || mood === 'cheer'
  const brows = sad ? ['M64 92 L88 84', 'M136 92 L112 84'] : ['M66 86 L88 84', 'M134 86 L112 84']
  return `<svg viewBox="0 0 200 215" width="${size}" height="${size * 1.07}" role="img" aria-label="عشري">
<defs><radialGradient id="iris" cx=".5" cy=".3"><stop offset="0" stop-color="#8ff3ff"/><stop offset="1" stop-color="#1f6bff"/></radialGradient>
<linearGradient id="jk" x1="0" x2="1"><stop offset="0" stop-color="#8b5cff"/><stop offset="1" stop-color="#ff3df2"/></linearGradient></defs>
<rect x="52" y="150" width="96" height="60" rx="26" fill="#1d2552"/>
<path d="M44 215 Q46 160 100 156 Q154 160 156 215Z" fill="url(#jk)"/>
<path d="M76 158 Q100 176 124 158 L130 172 Q100 192 70 172Z" fill="#22e4ff"/>
${arm ? `<g class="wavearm" style="transform-origin:150px 175px"><path d="M148 178 Q172 150 170 118" stroke="url(#jk)" stroke-width="20" stroke-linecap="round" fill="none"/><circle cx="170" cy="112" r="11" fill="#ffd9b8"/></g>`
      : `<path d="M150 180 Q166 200 160 215" stroke="url(#jk)" stroke-width="20" stroke-linecap="round" fill="none"/>`}
<path d="M40 112 Q30 40 100 26 Q170 40 160 112 Q150 70 100 66 Q50 70 40 112Z" fill="#161040"/>
<ellipse cx="100" cy="112" rx="53" ry="52" fill="#ffd9b8"/>
<ellipse cx="46" cy="116" rx="7" ry="10" fill="#f6c19b"/><ellipse cx="154" cy="116" rx="7" ry="10" fill="#f6c19b"/>
<path d="M44 100 Q40 44 100 34 Q160 44 156 100 L146 66 L134 90 L118 58 L102 88 L84 58 L70 90 L56 66Z" fill="#161040"/>
<path d="M96 40 L102 62 L112 42" stroke="#22e4ff" stroke-width="4" fill="none" stroke-linecap="round"/>
${brows.map(d => `<path d="${d}" stroke="#161040" stroke-width="4" stroke-linecap="round"/>`).join('')}
${eye(78)}${eye(122)}
<ellipse cx="64" cy="128" rx="9" ry="5" fill="#ff8fb8" opacity=".6"/><ellipse cx="136" cy="128" rx="9" ry="5" fill="#ff8fb8" opacity=".6"/>
${mouths[mood]}</svg>`
}
const ashry = (mood, say) => `<div class="mascot"><div class="pic">${art(mood)}</div>${say ? `<div class="bubble">${say}</div>` : ''}</div>`
const hud = () => `<div class="hud"><div class="chip">🔥 ${p.streak}</div><div class="chip">⭐ ${p.xp} XP</div><div class="chip">Lv ${lvl(p.xp)}</div></div>`
const rateRow = `<div class="row rate"><button class="btn pink" data-act="rate" data-g="0">صعب</button><button class="btn" data-act="rate" data-g="3">تمام</button><button class="btn" data-act="rate" data-g="5">سهل</button></div>`
const flipCard = (front, back) => `<div class="flip" data-act="flip" data-w="${front}"><div><div class="f"><h1 class="en" style="font-size:2.6rem">${front}</h1></div><div class="f b"><div>${back}</div></div></div></div>`

/* ---------- الصفحات ---------- */
const L = { id: null, i: 0 }
let route = ''
function journey() {
  const next = all.find(l => !p.done.includes(l.id))
  return `${hud()}${ashry('wave', next ? `يلا نكمّل: ${next.title}` : 'خلصت كل المتاح! محتوى جديد جاي قريب 🎉')}
${next ? `<a class="btn" href="#/lesson/${next.id}">كمّل الرحلة</a>` : ''}
${levels.map(lv => `<section class="world" style="--c:${lv.color}"><h2><span>${lv.emoji}</span><span class="en">${lv.id}</span> ${lv.name}</h2><div class="path">
${lv.lessons.length ? '' : '<div class="card" style="color:var(--muted)">قريباً…</div>'}
${lv.lessons.map((l, j) => {
    const done = p.done.includes(l.id), isNext = next && next.id === l.id
    return `<div style="align-self:${j % 2 ? 'flex-end' : 'flex-start'};margin-inline:30px"><a class="stop ${done ? 'done' : ''} ${isNext ? 'next' : ''} ${!done && !isNext ? 'locked' : ''}" ${done || isNext ? `href="#/lesson/${l.id}"` : ''}>${done ? '✓' : j + 1}<small>${l.title}</small></a></div>`
  }).join('')}</div></section>`).join('')}`
}
function lesson(id) {
  const les = all.find(l => l.id === id); if (!les) return '<p>الدرس مش موجود</p>'
  if (L.id !== id) { L.id = id; L.i = 0 }
  const w = les.words[L.i]
  return `<h1>${les.title}</h1>${ashry('happy', `كلمة ${L.i + 1} من ${les.words.length} — اضغط على الكارت`)}
${flipCard(w[0], `<h2>${w[1]}</h2><p class="en" style="margin-top:8px">${w[2]}</p>`)}${rateRow}
<div class="row"><button class="btn pink" data-act="say" data-t="${w[2]}">🔊 الجملة</button></div>`
}
function review() {
  const d = dueWords(); if (!d.length) return ashry('cheer', 'مفيش مراجعة النهارده. شغل ممتاز! 🎉')
  const w = d[0]
  return `${ashry('happy', `باقي ${d.length} كلمة للمراجعة`)}${flipCard(w[0], `<h2>${w[1]}</h2>`)}${rateRow}`
}
const games = () => ashry('cheer', 'الألعاب (Wordle, Hangman, مطابقة) في المرحلة الجاية!')
const me = () => `<h1>ملفي</h1>
<div class="card" style="margin-top:14px">🔥 ${p.streak} يوم متتالي<br>⭐ ${p.xp} XP — المستوى ${lvl(p.xp)}<br>📚 ${Object.keys(p.cards).length} كلمة اتعلمت</div>
<div class="card">الهدف اليومي: ${[10, 20, 30].map(m => `<button class="btn" style="padding:6px 14px;margin:4px;opacity:${p.dailyGoal === m ? 1 : .45}" data-act="goal" data-m="${m}">${m} د</button>`).join('')}</div>
<div class="card"><p style="margin-bottom:10px">تقدمك محفوظ على جهازك. خد نسخة احتياطية عشان ما تضيعش لو مسحت بيانات المتصفح.</p>
<button class="btn" data-act="export">تصدير نسخة</button>
<label class="btn pink" style="display:inline-block;margin-inline-start:8px;cursor:pointer">استيراد<input type="file" id="imp" accept=".json" hidden></label></div>`

function render() {
  const parts = (location.hash || '#/').slice(1).split('/'); route = parts[1] || ''
  const html = { '': journey, lesson: () => lesson(parts[2]), review, games, me }[route] || journey
  document.getElementById('app').innerHTML = html()
  document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('active', a.dataset.r === route || (route === 'lesson' && a.dataset.r === '')))
  scrollTo(0, 0)
}
addEventListener('hashchange', render)

document.addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return
  const a = b.dataset.act
  if (a === 'flip') { b.classList.toggle('on'); speak(b.dataset.w) }
  else if (a === 'say') speak(b.dataset.t, .8)
  else if (a === 'goal') { p.dailyGoal = +b.dataset.m; save(); render() }
  else if (a === 'export') {
    const l = document.createElement('a'); l.href = URL.createObjectURL(new Blob([JSON.stringify(p)], { type: 'application/json' }))
    l.download = 'study-trip-backup.json'; l.click()
  } else if (a === 'rate') {
    const g = +b.dataset.g
    if (route === 'lesson') {
      const les = all.find(l => l.id === L.id), w = les.words[L.i]
      p.cards[w[0]] = sm2(p.cards[w[0]], g); L.i++
      if (L.i >= les.words.length) { p.xp += 20; if (!p.done.includes(L.id)) p.done.push(L.id); L.id = null; save(); location.hash = '#/'; return }
    } else { const w = dueWords()[0]; p.cards[w[0]] = sm2(p.cards[w[0]], g); p.xp += 2 }
    save(); render()
  }
})
document.addEventListener('change', e => {
  if (e.target.id !== 'imp' || !e.target.files[0]) return
  e.target.files[0].text().then(t => { p = { ...empty(), ...JSON.parse(t) }; save(); render() }).catch(() => alert('الملف مش صالح'))
})
render()
