<template>
  <nav class="max-w-2xl mx-auto px-6 py-6 flex justify-between items-center">
    <span class="text-base font-medium tracking-tight">Arjun Mehta</span>
    <div class="flex items-center gap-6">
      <a v-for="link in links" :key="link" :href="`#${link.toLowerCase()}`"
        class="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
        {{ link }}
      </a>
      <button @click="$emit('toggle-theme')"
        class="text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm"
        :aria-label="dark ? 'Switch to light mode' : 'Switch to dark mode'">
        {{ dark ? '☀' : '☾' }}
      </button>
    </div>
  </nav>
</template>

<script setup>
defineProps({ dark: Boolean })
defineEmits(['toggle-theme'])
const links = ['Skills', 'Projects', 'Experience', 'Contact']
</script>
