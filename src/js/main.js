import '../css/style.css'
import './i18n.js'

window.addEventListener('DOMContentLoaded', () => {
  // humberger menu
  const hamburger = document.querySelector('.hamburger')
  const nav = document.querySelector('nav')

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true'
    hamburger.setAttribute('aria-expanded', !expanded)
    hamburger.classList.toggle('active')
    nav.classList.toggle('active')
  })

  // light/dark theme
  const themeToggleBtn = document.getElementById('theme-toggle')
  const iconSun = themeToggleBtn.querySelector('.icon-sun')
  const iconMoon = themeToggleBtn.querySelector('.icon-moon')

  // Load saved theme or default to light
  const savedTheme = localStorage.getItem('theme') || 'light'
  document.documentElement.setAttribute('data-theme', savedTheme)
  updateToggleIcon(savedTheme)

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
    updateToggleIcon(newTheme)
  })

  function updateToggleIcon(theme) {
    if (theme === 'dark') {
      iconSun.style.display = 'block'
      iconMoon.style.display = 'none'
      themeToggleBtn.setAttribute('aria-pressed', 'true')
    } else {
      iconSun.style.display = 'none'
      iconMoon.style.display = 'block'
      themeToggleBtn.setAttribute('aria-pressed', 'false')
    }
  }

  // get latest mobile android app link
  async function updateDownloadLink() {
    try {
      const url = 'https://raw.githubusercontent.com/aelassas/bookcars/main/.github/latest-release.json'
      const cacheBustedUrl = `${url}?t=${Date.now()}`
      const res = await fetch(cacheBustedUrl)
      if (!res.ok) throw new Error('Failed to fetch latest release info')
      const data = await res.json()
      const link = document.getElementById('download-mobile-app')
      link.href = data.latestApkUrl
    } catch (err) {
      console.error(err)
      document.getElementById('demo-mobile-app').style.display = 'none'
    }
  }

  updateDownloadLink()

  document.getElementById('year').textContent = new Date().getFullYear()
})
