import { loadInitialLanguage, setLang } from './i18n.js'
import {
  initHamburgerMenu,
  initHeaderScroll,
  initLanguageMenu,
  initThemeToggle,
  updateDownloadLink,
  updateFooterYear
} from './ui.js'

/**
 * Initializes updating the mobile app download link.
 * Uses `requestIdleCallback` to defer the update until the browser is idle,
 * with a fallback to `setTimeout` if `requestIdleCallback` is not supported.
 */
function initDownloadLink() {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(updateDownloadLink)
  } else {
    setTimeout(updateDownloadLink, 100) // fallback
  }
}

// Wait for DOM to be fully loaded before initializing the app
window.addEventListener('DOMContentLoaded', async () => {
  try {
    // Load and apply the correct language based on ?lang or localStorage
    await loadInitialLanguage()

    // Initialize UI components
    initHamburgerMenu()        // Mobile nav toggle
    initHeaderScroll()         // Header border on scroll
    initLanguageMenu(setLang)  // Language dropdown logic
    initThemeToggle()          // Light/dark mode toggle
    initDownloadLink()         // Fetch latest mobile APK link
    updateFooterYear()         // Set current year in footer
  } catch (err) {
    console.error('Error during app initialization:', err)
  }
})
