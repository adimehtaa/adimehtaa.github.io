<template>
  <section class="py-16">
    <p class="text-sm text-gray-400 dark:text-gray-500 mb-3">Backend Engineer — open to remote roles</p>
    <h1 class="text-4xl sm:text-5xl font-medium tracking-tight leading-tight mb-4">
      Hi, I'm Arjun.<br />I build reliable backends.
    </h1>
    <p class="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg mb-8">
      7 years designing and shipping APIs, distributed systems, and data pipelines.
      I care about correctness, performance, and codebases that are a pleasure to work in.
    </p>

    <!-- Tech chips -->
    <div class="flex flex-wrap gap-2 mb-8">
      <span v-for="chip in primary" :key="chip"
        class="text-xs px-3 py-1.5 rounded-full border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950">
        {{ chip }}
      </span>
      <span v-for="chip in secondary" :key="chip"
        class="text-xs px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
        {{ chip }}
      </span>
    </div>

    <!-- CTAs -->
    <div class="flex gap-3 flex-wrap">
      <a href="#projects"
        class="px-5 py-2.5 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm hover:opacity-80 transition-opacity">
        View my work
      </a>
      <a href="/cv.pdf" download
        class="px-5 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        Download CV
      </a>
    </div>
  </section>
</template>

<script setup>
const primary = ['Go', 'Python', 'PostgreSQL']
const secondary = ['Kafka', 'Kubernetes', 'AWS', 'gRPC', 'Redis']
</script>
