export function speak(text, rate = 0.9) {
  if (!('speechSynthesis' in window)) return
  speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text); u.lang = 'en-US'; u.rate = rate
  speechSynthesis.speak(u)
}
