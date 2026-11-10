// المحتوى هنا بس: ضيف دروس جديدة من غير ما تلمس الكود
export const levels = [
  { id: 'A0', name: 'قرية البداية', emoji: '🌱', color: '#22e4ff', lessons: [
    { id: 'a0-1', title: 'Hello! أول كلمات', words: [['hello','مرحبا','Hello, my name is Ashry.'],['goodbye','مع السلامة','Goodbye, see you soon.'],['yes','أيوه / نعم','Yes, I do.'],['no','لا','No, thank you.'],['please','من فضلك','Water, please.']] },
    { id: 'a0-2', title: 'الحروف والأصوات', words: [['apple','تفاحة','I eat an apple.'],['book','كتاب','This is my book.'],['cat','قطة','The cat is small.']] },
    { id: 'a0-3', title: 'الأرقام 1-10', words: [['one','واحد','I have one pen.'],['two','اتنين','Two cups, please.'],['three','تلاتة','Three friends.']] },
  ]},
  { id: 'A1', name: 'مدينة الأساسيات', emoji: '🏘️', color: '#8b5cff', lessons: [] },
  { id: 'A2', name: 'محطة القطار', emoji: '🚆', color: '#ff3df2', lessons: [] },
  { id: 'B1', name: 'المطار الدولي', emoji: '✈️', color: '#22e4ff', lessons: [] },
  { id: 'B2', name: 'مدينة الأعمال', emoji: '🏙️', color: '#8b5cff', lessons: [] },
  { id: 'C1', name: 'قمة الإتقان', emoji: '🏔️', color: '#ff3df2', lessons: [] },
]
export const allLessons = levels.flatMap(l => l.lessons)
