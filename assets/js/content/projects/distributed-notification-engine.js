window.PROJECTS.push({
        slug: "distributed-notification-engine",
        name: "Distributed Notification Engine",
        summary:
            "An event-driven notification platform designed to reliably deliver Email, SMS, Push, and WhatsApp messages at scale.",
        featured: true,
        image: "./assets/images/distributed-notification-engine.png",
        links: {
            live: "",
            github: "#",
        },
        tech: [
            "Java 21",
            "Spring Boot",
            "Kafka",
            "RabbitMQ",
            "Redis",
            "PostgreSQL",
            "MongoDB",
            "Docker",
        ],
        body: `
      <p>An 8-service distributed notification engine routing messages through Kafka priority queues with per-tier retries and dead-letter handling. It uses Redis for idempotency and rate limiting, PostgreSQL for delivery audits, MongoDB for versioned templates, and circuit breakers to isolate provider failures.</p>

      <h2>Architecture</h2>
      <p>API Gateway → Notification API → Kafka priority topics → channel workers → provider adapters. Redis handles idempotency, deduplication, rate limiting, and circuit-breaker state; PostgreSQL stores delivery history while MongoDB stores versioned templates.</p>

      <h2>Highlights</h2>
      <ul>
        <li>Priority-based routing with independent retry policies.</li>
        <li>24-hour Redis idempotency keys to prevent duplicate delivery.</li>
        <li>Dead-letter queues for failed messages and operational recovery.</li>
        <li>Provider isolation through circuit breakers.</li>
      </ul>

      <h2>Problem</h2>
      <p>The goal was to build a single notification workflow that can accept high-volume requests while keeping channel-specific failures from affecting the rest of the system.</p>

      <h2>Design Decisions</h2>
      <p>The system separates ingestion, queueing, orchestration, and provider delivery so each part can scale independently. Messages carry delivery metadata, priority, retry state, and an idempotency key.</p>

      <h2>Reliability</h2>
      <p>Retries, dead-letter queues, idempotency, rate limits, and circuit breakers work together to make delivery safer when providers are slow, unavailable, or return duplicate responses.</p>
    `,
    });
