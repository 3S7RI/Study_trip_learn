import { NavLink } from 'react-router-dom'
const items = [['/', '🗺️', 'الرحلة'], ['/review', '🃏', 'المراجعة'], ['/games', '🎮', 'الألعاب'], ['/me', '👤', 'ملفي']]
export default function BottomNav() {
  return <nav className="nav">{items.map(([to, i, t]) => <NavLink key={to} to={to} end={to === '/'}><span>{i}</span>{t}</NavLink>)}</nav>
}
