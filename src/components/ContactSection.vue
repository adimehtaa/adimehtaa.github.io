<template>
  <section id="contact" class="py-12 pb-16">
    <h2 class="text-2xl font-medium tracking-tight mb-3">Let's work together.</h2>
    <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 max-w-sm">
      Open to senior backend roles, technical consulting, and open source collaboration.
      I reply within 24 hours.
    </p>
    <div class="flex flex-wrap gap-5">
      <a v-for="link in links" :key="link.label"
        :href="link.href"
        class="text-sm text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600 pb-0.5 hover:border-gray-900 dark:hover:border-gray-100 transition-colors">
        {{ link.label }}
      </a>
    </div>
  </section>
</template>

<script setup>
const links = [
  { label: 'arjun@example.dev', href: 'mailto:arjun@example.dev' },
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter', href: 'https://twitter.com' }
]
</script>
