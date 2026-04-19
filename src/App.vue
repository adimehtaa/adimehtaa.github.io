<template>
  <div class="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
    <NavBar @toggle-theme="toggleTheme" :dark="dark" />
    <main class="max-w-2xl mx-auto px-6">
      <HeroSection />
      <div class="border-t border-gray-100 dark:border-gray-800" />
      <SkillsSection />
      <div class="border-t border-gray-100 dark:border-gray-800" />
      <ProjectsSection />
      <div class="border-t border-gray-100 dark:border-gray-800" />
      <ExperienceSection />
      <div class="border-t border-gray-100 dark:border-gray-800" />
      <ContactSection />
    </main>
    <FooterBar />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterBar from './components/FooterBar.vue'

const dark = ref(false)

onMounted(() => {
  dark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme()
})

function toggleTheme() {
  dark.value = !dark.value
  applyTheme()
}

function applyTheme() {
  if (dark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>
