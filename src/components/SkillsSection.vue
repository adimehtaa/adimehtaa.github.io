<template>
  <section id="skills" class="py-12">
    <p class="text-xs tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-7">Skills</p>
    <div class="grid grid-cols-2 gap-x-10 gap-y-8">
      <div v-for="cat in skills" :key="cat.name">
        <h3 class="text-sm font-medium mb-3">{{ cat.name }}</h3>
        <ul class="space-y-1.5">
          <li v-for="item in cat.items" :key="item"
            class="text-sm text-gray-500 dark:text-gray-400">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
const skills = [
  {
    name: 'Languages',
    items: ['Go — primary language', 'Python — data & scripting', 'Java — enterprise systems', 'Rust — learning']
  },
  {
    name: 'Databases',
    items: ['PostgreSQL', 'Redis', 'MongoDB', 'ClickHouse']
  },
  {
    name: 'Infrastructure',
    items: ['Kubernetes & Docker', 'AWS (EKS, RDS, SQS)', 'Terraform', 'GitHub Actions / CI/CD']
  },
  {
    name: 'APIs & Messaging',
    items: ['REST / OpenAPI', 'gRPC & Protocol Buffers', 'Apache Kafka', 'GraphQL']
  }
]
</script>
