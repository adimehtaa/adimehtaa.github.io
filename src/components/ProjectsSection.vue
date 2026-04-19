<template>
  <section id="projects" class="py-12">
    <p class="text-xs tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-7">Projects</p>
    <div class="divide-y divide-gray-100 dark:divide-gray-800">
      <div v-for="proj in projects" :key="proj.title"
        class="py-5 grid grid-cols-[1fr_auto] gap-4 items-start">
        <div>
          <h3 class="text-base font-medium mb-1.5">{{ proj.title }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3">{{ proj.desc }}</p>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="tag in proj.stack" :key="tag"
              class="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              {{ tag }}
            </span>
          </div>
        </div>
        <span class="text-xs text-gray-400 dark:text-gray-500 pt-1 whitespace-nowrap">{{ proj.year }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = [
  {
    title: 'HorizonAPI',
    desc: 'API gateway in Go handling 100k+ req/s with sub-2ms p99 latency. Supports rate limiting, circuit breaking, and JWT auth via config file. 11k GitHub stars.',
    stack: ['Go', 'etcd', 'Prometheus', 'Docker'],
    year: '2024'
  },
  {
    title: 'StreamLedger',
    desc: 'Event-sourcing and CQRS framework on Kafka + PostgreSQL for fintech audit trails and replay capability at scale. Processes 5M events/day.',
    stack: ['Go', 'Kafka', 'PostgreSQL', 'gRPC'],
    year: '2023'
  },
  {
    title: 'sqlprobe',
    desc: 'Drop-in Go library for tracing slow queries, N+1 patterns, and connection pool exhaustion. Integrates with OpenTelemetry. 4.2k stars, 120+ contributors.',
    stack: ['Go', 'OpenTelemetry', 'PostgreSQL'],
    year: '2022'
  },
  {
    title: 'FluxPipeline',
    desc: 'Python framework for fault-tolerant ETL pipelines with dead-letter queues, schema validation, and backpressure. Processes 50GB+ of data daily in production.',
    stack: ['Python', 'Kafka', 'ClickHouse', 'Airflow'],
    year: '2022'
  }
]
</script>
