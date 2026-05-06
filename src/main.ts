// ===== TABS =====
function initTabs(): void {
  const tabBtns = document.querySelectorAll<HTMLButtonElement>('.tab-btn')
  const tabContents = document.querySelectorAll<HTMLElement>('.tab-content')

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab!
      tabBtns.forEach(b => b.classList.remove('active'))
      tabContents.forEach(c => c.classList.remove('active'))
      btn.classList.add('active')
      document.getElementById(target)?.classList.add('active')
    })
  })
}

// ===== QUIZ =====
interface QuizState {
  answers: string[]
  currentStep: number
}

const state: QuizState = { answers: [], currentStep: 0 }
const TOTAL_STEPS = 5

function updateProgressDots(upTo: number): void {
  document.querySelectorAll<HTMLElement>('.progress-dot').forEach((dot, i) => {
    dot.classList.toggle('done', i <= upTo)
  })
}

function goToStep(step: number): void {
  document.querySelectorAll<HTMLElement>('.quiz-step').forEach(s => s.classList.remove('active'))
  document.getElementById(`step-${step}`)?.classList.add('active')
  state.currentStep = step
  updateProgressDots(step)
}

function getRecommendation(answers: string[]): { level: string; desc: string; courses: string } {
  const [eduLevel, subject, score, goal, style] = answers

  const levelLabels: Record<string, string> = {
    primary: 'ประถมศึกษา', junior: 'มัธยมต้น (ม.1-3)',
    senior: 'มัธยมปลาย (ม.4-6)', entrance: 'TCAS / GAT-PAT'
  }
  const subjectLabels: Record<string, string> = {
    math: 'คณิตศาสตร์', science: 'วิทยาศาสตร์',
    english: 'ภาษาอังกฤษ', thai: 'ภาษาไทย / สังคม'
  }
  const styleLabels: Record<string, string> = {
    group: 'กลุ่มเล็ก <=15 คน', private: 'เรียนส่วนตัว 1:1',
    online: 'คอร์สออนไลน์ Live', intensive: 'คอร์สเข้มข้น (ทุกวัน)'
  }

  let cefr = 'B1'
  let desc = 'ระดับกลาง - พร้อมพัฒนาทักษะให้แข็งแกร่งยิ่งขึ้น'
  if (score === 'low') { cefr = 'A1'; desc = 'ระดับเริ่มต้น - เราจะเสริมพื้นฐานให้แน่นก่อนเลย' }
  else if (score === 'medium') { cefr = 'A2'; desc = 'ระดับพื้นฐาน - มีศักยภาพพัฒนาได้อีกมาก' }
  else if (score === 'good') { cefr = 'B1'; desc = 'ระดับกลาง - ก้าวถัดไปคือ advanced' }
  else if (score === 'excellent') { cefr = 'B2'; desc = 'ระดับสูง - เหมาะกับคอร์ส advanced หรือโอลิมปิก' }

  if (goal === 'university' || goal === 'competition') {
    cefr += '+'
    desc += ' เหมาะกับคอร์สเข้มข้นมาก'
  }

  const courses =
    'วิชาที่แนะนำ: ' + (subjectLabels[subject] ?? subject) + '\n' +
    'ระดับ: ' + (levelLabels[eduLevel] ?? eduLevel) + '\n' +
    'รูปแบบ: ' + (styleLabels[style] ?? style) + '\n' +
    'คอร์สแนะนำ: ' + (subjectLabels[subject] ?? subject) + ' ' + (styleLabels[style] ?? style)

  return { level: cefr, desc, courses }
}

function showQuizResult(): void {
  document.querySelectorAll<HTMLElement>('.quiz-step').forEach(s => s.classList.remove('active'))
  document.querySelectorAll<HTMLElement>('.progress-dot').forEach(d => d.classList.add('done'))

  const { level, desc, courses } = getRecommendation(state.answers)
  const resultEl = document.getElementById('quizResult')!
  document.getElementById('resultLevel')!.textContent = level
  document.getElementById('resultDesc')!.textContent = desc
  const coursesEl = document.getElementById('resultCourses')!
  coursesEl.style.whiteSpace = 'pre-line'
  coursesEl.textContent = courses
  resultEl.style.display = 'block'
}

function initQuiz(): void {
  for (let i = 0; i < TOTAL_STEPS; i++) {
    const stepEl = document.getElementById(`step-${i}`)
    if (!stepEl) continue

    const opts = stepEl.querySelectorAll<HTMLButtonElement>('.quiz-opt')
    opts.forEach(opt => {
      opt.addEventListener('click', () => {
        opts.forEach(o => o.classList.remove('selected'))
        opt.classList.add('selected')
      })
    })

    document.getElementById(`next-${i}`)?.addEventListener('click', () => {
      const selected = stepEl.querySelector<HTMLButtonElement>('.quiz-opt.selected')
      state.answers[i] = selected ? (selected.dataset.value ?? '') : (opts[0]?.dataset.value ?? '')
      if (!selected) opts[0]?.classList.add('selected')

      if (i < TOTAL_STEPS - 1) goToStep(i + 1)
      else showQuizResult()
    })
  }

  document.getElementById('quizRetry')?.addEventListener('click', () => {
    state.answers = []
    state.currentStep = 0
    document.getElementById('quizResult')!.style.display = 'none'
    document.querySelectorAll<HTMLButtonElement>('.quiz-opt').forEach(o => o.classList.remove('selected'))
    goToStep(0)
  })
}

// ===== COURSE FINDER =====
function initFinder(): void {
  document.getElementById('finderBtn')?.addEventListener('click', () => {
    const level = (document.getElementById('finderLevel') as HTMLSelectElement).value
    const subject = (document.getElementById('finderSubject') as HTMLSelectElement).value
    const goal = (document.getElementById('finderGoal') as HTMLSelectElement).value

    if (!level || !subject || !goal) {
      alert('กรุณาเลือกข้อมูลให้ครบทุกช่อง')
      return
    }

    const levelMap: Record<string, string> = {
      primary: 'ประถมศึกษา', junior: 'มัธยมต้น',
      senior: 'มัธยมปลาย', entrance: 'TCAS/GAT-PAT'
    }
    const subjectMap: Record<string, string> = {
      math: 'คณิตศาสตร์', science: 'วิทยาศาสตร์',
      english: 'ภาษาอังกฤษ', thai: 'ภาษาไทย',
      social: 'สังคมศึกษา', all: 'ทุกวิชา'
    }
    const goalMap: Record<string, string> = {
      grade: 'เพิ่ม GPA', school: 'สอบเข้าโรงเรียน',
      university: 'ติดมหาวิทยาลัย', onet: 'O-NET/A-Level',
      foundation: 'เสริมพื้นฐาน'
    }

    const text =
      'คอร์ส' + (subjectMap[subject]) + ' สำหรับ' + (levelMap[level]) + '\n' +
      'เป้าหมาย: ' + (goalMap[goal]) + '\n' +
      'โทร 074-000-000 เพื่อสำรองที่นั่ง'
    document.getElementById('finderResultText')!.textContent = text
    document.getElementById('finderResult')!.style.display = 'block'
  })
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimate(): void {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.unobserve(el)
        }
      })
    },
    { threshold: 0.1 }
  )

  document
    .querySelectorAll<HTMLElement>(
      '.course-card, .teacher-card, .service-card, .testimonial-card, .news-card'
    )
    .forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(24px)'
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
      observer.observe(el)
    })
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initTabs()
  initQuiz()
  initFinder()
  initScrollAnimate()
})
