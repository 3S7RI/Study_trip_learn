// SM-2: grade 0=صعب 3=تمام 5=سهل
export function review(card = { ease: 2.5, interval: 0, reps: 0 }, grade) {
  let { ease, interval, reps } = card
  if (grade < 3) { reps = 0; interval = 1 }
  else { reps += 1; interval = reps === 1 ? 1 : reps === 2 ? 3 : Math.round(interval * ease) }
  ease = Math.max(1.3, ease + 0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
  return { ease, interval, reps, due: Date.now() + interval * 864e5 }
}
export const isDue = (c) => !c || !c.due || c.due <= Date.now()
