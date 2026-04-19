<template>
  <section id="experience" class="py-12">
    <p class="text-xs tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-7">Experience</p>
    <div class="divide-y divide-gray-100 dark:divide-gray-800">
      <div v-for="job in experience" :key="job.company"
        class="py-5 grid grid-cols-[140px_1fr] gap-5 items-start">
        <div>
          <span class="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">{{ job.period }}</span>
        </div>
        <div>
          <h3 class="text-base font-medium mb-0.5">{{ job.role }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">{{ job.company }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ job.note }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const experience = [
  {
    period: '2022 — present',
    role: 'Senior Backend Engineer',
    company: 'Stripe — Remote',
    note: 'Payments infrastructure team. Reduced payment routing p99 latency from 340ms to 38ms. Led migration of 3 core services to gRPC microservices with zero downtime. Mentored 4 engineers.'
  },
  {
    period: '2019 — 2022',
    role: 'Backend Engineer',
    company: 'Grab — Singapore',
    note: 'Built real-time data ingestion pipeline for 8 SE Asian markets, processing 5M events/day. Reduced warehouse query time by 60% through columnar storage optimisation.'
  },
  {
    period: '2017 — 2019',
    role: 'Software Engineer',
    company: 'Freshworks — Chennai',
    note: 'Built REST APIs for 10k+ business customers. Implemented async job processing handling 2M+ tasks/day with <0.1% failure rate using Sidekiq and Redis.'
  }
]
</script>
