let currentLang = 'en'

function applyTranslations(translations) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n')
    if (translations[key]) {
      el.textContent = translations[key]
    }
  })

  // Support placeholder translations
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder')
    const translation = translations[key]
    if (translation) {
      el.setAttribute('placeholder', translation)
    }
  })

  const defaultLang = 'en'

  // Get saved language from localStorage or fallback to default
  const lang = localStorage.getItem('lang') || defaultLang

  // Build hrefs
  fetch(`./locales/${lang}.json`)
    .then(res => res.json())
    .then(translations => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n')
        const translation = translations[key]
        if (!translation) return

        // Check if translation includes any HTML tag (like <a>, <strong>, etc.)
        const hasHTML = /<\/?[a-z][\s\S]*>/i.test(translation)

        if (hasHTML) {
          el.innerHTML = translation
        } else {
          el.textContent = translation
        }
      })
    })
    .catch(err => console.error(`Failed to load ${lang} translations`, err))
}

async function setLang(lang) {
  try {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
    const res = await fetch(`locales/${lang}.json`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const translations = await res.json()
    applyTranslations(translations)
    currentLang = lang

    // Highlight the selected button
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      const code = btn.textContent.trim().toLowerCase()
      btn.classList.toggle('active-lang', code === lang.toLowerCase())
    })
  } catch (err) {
    console.error(`Failed to load ${lang} translations:`, err)
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search)
  const urlLang = params.get('lang')
  const storedLang = localStorage.getItem('lang')

  const supportedLangs = ['en', 'fr', 'es']
  const lang = supportedLangs.includes(urlLang) ? urlLang
    : supportedLangs.includes(storedLang) ? storedLang
      : 'en'

  setLang(lang)
})
