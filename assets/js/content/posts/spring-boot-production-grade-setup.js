window.POSTS.push({
    slug: "spring-boot-production-grade-setup",
    title: "Spring Boot Production-Grade Setup: A Practical Guide",
    date: "September 4, 2026",
    summary: "A practical checklist for building, securing, monitoring, and deploying a production-grade Spring Boot application.",
    featured: true,
    body: `
        <p>
            A Spring Boot application can be running successfully on your laptop and still
            be far from production-ready. A production-grade application needs more than
            working business logic—it needs secure configuration, observability, reliable
            database management, graceful failure handling, health checks, and a deployment
            strategy that makes failures recoverable.
        </p>

        <h2>1. Use the Right Spring Boot Baseline</h2>

        <p>
            Start with a currently supported Spring Boot release and a supported Java LTS
            version. Avoid building a new production service on an outdated or end-of-life
            Java or Spring Boot version.
        </p>

        <p>
            Keep the dependency tree as small as practical. Every dependency increases the
            application's attack surface and maintenance cost.
        </p>

        <h2>2. Keep Configuration Outside the Application</h2>

        <p>
            Production configuration should not be hard-coded into Java classes or committed
            as environment-specific values.
        </p>

        <p>
            A typical configuration strategy is:
        </p>

        <ul>
            <li>Use <code>application.yml</code> for safe application defaults.</li>
            <li>Use environment variables or an external configuration system for deployment-specific values.</li>
            <li>Keep secrets such as database passwords, API keys, and signing keys outside Git.</li>
            <li>Use Spring profiles only when you genuinely need environment-specific configuration.</li>
        </ul>

        <p>
            For example:
        </p>

        <pre><code>spring:
  datasource:
    url: \${DB_URL}
    username: \${DB_USERNAME}
    password: \${DB_PASSWORD}

  jpa:
    open-in-view: false

server:
  shutdown: graceful</code></pre>

        <p>
            The important principle is simple: <strong>configuration changes should not
            require rebuilding the application.</strong>
        </p>

        <h2>3. Use Database Migrations</h2>

        <p>
            Do not depend on Hibernate's automatic schema creation in production.
            Database structure should be versioned and deployed in a controlled way.
        </p>

        <p>
            Tools such as Flyway or Liquibase can be used to manage database migrations.
        </p>

        <pre><code>spring:
  jpa:
    hibernate:
      ddl-auto: validate</code></pre>

        <p>
            The application should validate that the expected schema exists rather than
            silently modifying production tables.
        </p>

        <h2>4. Production Logging</h2>

        <p>
            Logs should help answer three questions quickly:
        </p>

        <ol>
            <li>What happened?</li>
            <li>Which request or operation caused it?</li>
            <li>What was the impact?</li>
        </ol>

        <p>
            Prefer structured logging, especially when logs are consumed by systems such as
            Elasticsearch, OpenSearch, Loki, Splunk, or cloud logging platforms.
        </p>

        <p>
            Avoid logging passwords, access tokens, session identifiers, authorization
            headers, or other sensitive information.
        </p>

        <h2>5. Add Actuator and Health Checks</h2>

        <p>
            Spring Boot Actuator provides endpoints useful for monitoring and operations.
            For production applications, health information is particularly important for
            load balancers and container orchestrators.
        </p>

        <pre><code>&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-actuator&lt;/artifactId&gt;
&lt;/dependency&gt;</code></pre>

        <p>
            Expose only the endpoints you actually need. Do not blindly expose every
            actuator endpoint to the public internet.
        </p>

        <pre><code>management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus

  endpoint:
    health:
      probes:
        enabled: true</code></pre>

        <p>
            In containerized environments, separate <strong>liveness</strong> from
            <strong>readiness</strong>. A service can be alive while temporarily unable
            to accept traffic.
        </p>

        <h2>6. Add Metrics and Observability</h2>

        <p>
            Logs tell you what happened. Metrics help you understand how the system is
            behaving over time.
        </p>

        <p>
            Micrometer integrates Spring Boot applications with monitoring systems such as
            Prometheus and other observability platforms.
        </p>

        <p>
            At minimum, monitor:
        </p>

        <ul>
            <li>Request rate</li>
            <li>Error rate</li>
            <li>Request latency</li>
            <li>JVM memory usage</li>
            <li>Garbage collection</li>
            <li>CPU usage</li>
            <li>Database connection pool usage</li>
            <li>External API failures</li>
        </ul>

        <h2>7. Use Distributed Tracing for Distributed Systems</h2>

        <p>
            If your application communicates with multiple services, asynchronous systems,
            or external APIs, request tracing becomes extremely valuable.
        </p>

        <p>
            OpenTelemetry is a good foundation for collecting traces and propagating
            correlation information across service boundaries.
        </p>

        <p>
            The goal is to be able to follow a request such as:
        </p>

        <pre><code>API Gateway
    |
    +-- Order Service
            |
            +-- Payment Service
            |
            +-- Inventory Service
            |
            +-- PostgreSQL</code></pre>

        <p>
            When a request takes three seconds instead of 100 milliseconds, tracing should
            make it possible to identify where that time was spent.
        </p>

        <h2>8. Secure the Application</h2>

        <p>
            Never treat Spring Security as an optional addition for an application that
            exposes sensitive business functionality.
        </p>

        <p>
            Depending on the application, security should address:
        </p>

        <ul>
            <li>Authentication</li>
            <li>Authorization</li>
            <li>OAuth 2.0 / OpenID Connect where appropriate</li>
            <li>CSRF protection where applicable</li>
            <li>CORS configuration</li>
            <li>Secure HTTP headers</li>
            <li>Input validation</li>
            <li>Rate limiting</li>
            <li>Secret management</li>
        </ul>

        <p>
            Do not put JWT signing keys or other credentials directly in
            <code>application.yml</code> committed to source control.
        </p>

        <h2>9. Validate Input at the API Boundary</h2>

        <p>
            Validate incoming requests before they reach the business layer.
            Jakarta Bean Validation provides a clean approach for common validation rules.
        </p>

        <pre><code>public record CreateUserRequest(
    @NotBlank String name,
    @Email @NotBlank String email
) {}</code></pre>

        <p>
            Then validate the request at the controller boundary:
        </p>

        <pre><code>@PostMapping("/users")
public ResponseEntity&lt;UserResponse&gt; createUser(
        @Valid @RequestBody CreateUserRequest request) {

    return ResponseEntity.ok(userService.create(request));
}</code></pre>

        <h2>10. Centralize Exception Handling</h2>

        <p>
            Avoid returning random exception messages from individual controllers.
            Use a consistent error response format and centralized exception handling.
        </p>

        <p>
            Spring's <code>@RestControllerAdvice</code> can be used to translate application
            exceptions into appropriate HTTP responses.
        </p>

        <pre><code>@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    ResponseEntity&lt;ProblemDetail&gt; handleNotFound(
            ResourceNotFoundException ex) {

        ProblemDetail problem =
                ProblemDetail.forStatus(HttpStatus.NOT_FOUND);

        problem.setDetail(ex.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(problem);
    }
}</code></pre>

        <p>
            A consistent error contract makes life easier for frontend applications,
            mobile clients, and other services consuming your API.
        </p>

        <h2>11. Configure Database Connection Pools Carefully</h2>

        <p>
            Spring Boot commonly uses HikariCP for JDBC connection pooling.
            Do not assume that increasing the pool size always improves performance.
        </p>

        <p>
            Too many database connections can actually make the database slower.
            Pool sizing should be based on application concurrency, query performance,
            database capacity, and measured workload.
        </p>

        <pre><code>spring:
  datasource:
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000</code></pre>

        <p>
            The numbers above are examples, not universal production defaults.
            Benchmark your actual workload before tuning them.
        </p>

        <h2>12. Set Timeouts for External Calls</h2>

        <p>
            One of the easiest ways to create a production incident is to call an external
            service without appropriate timeouts.
        </p>

        <p>
            Every network dependency should have sensible connection and response timeouts.
            Depending on the use case, also consider retries, circuit breakers, bulkheads,
            and fallback behavior.
        </p>

        <p>
            Be particularly careful with retries. Retrying a non-idempotent operation can
            accidentally create duplicate payments, orders, or other side effects.
        </p>

        <h2>13. Make Shutdown Graceful</h2>

        <p>
            Production applications should be able to shut down without abruptly
            terminating requests that are already being processed.
        </p>

        <pre><code>server:
  shutdown: graceful</code></pre>

        <p>
            In Kubernetes or another orchestrated environment, combine graceful shutdown
            with appropriate readiness and termination settings so that traffic stops
            reaching an instance before it exits.
        </p>

        <h2>14. Containerize the Application</h2>

        <p>
            A Spring Boot service can be packaged as a container image and deployed through
            Docker, Kubernetes, ECS, or another container platform.
        </p>

        <p>
            Keep the production image minimal and run the application as a non-root user
            where practical.
        </p>

        <p>
            Also consider reproducible builds, image vulnerability scanning, and a process
            for regularly rebuilding images when the base image or dependencies receive
            security updates.
        </p>

        <h2>15. Do Not Hard-Code Environment Assumptions</h2>

        <p>
            The same application artifact should ideally move through environments while
            environment-specific configuration is supplied externally.
        </p>

        <p>
            Avoid code such as:
        </p>

        <pre><code>if (environment.equals("production")) {
    // completely different application behavior
}</code></pre>

        <p>
            Environment-specific behavior should generally be expressed through explicit
            configuration or deployment mechanisms rather than scattered throughout the
            business code.
        </p>

        <h2>16. Add Automated Tests</h2>

        <p>
            A production-grade setup needs more than unit tests.
        </p>

        <ul>
            <li>Unit tests for business logic</li>
            <li>Integration tests for important infrastructure interactions</li>
            <li>API/controller tests</li>
            <li>Database tests</li>
            <li>Security tests</li>
            <li>End-to-end tests for critical workflows</li>
        </ul>

        <p>
            Testcontainers is particularly useful when integration tests need real
            infrastructure such as PostgreSQL, Redis, Kafka, or other services.
        </p>

        <h2>17. Add Dependency and Container Security Scanning</h2>

        <p>
            Production readiness also means knowing what your application is built from.
            Scan dependencies and container images for known vulnerabilities.
        </p>

        <p>
            Keep dependencies updated and remove libraries that are no longer required.
            Automated dependency update tools can help reduce the maintenance burden.
        </p>

        <h2>18. Use CI/CD</h2>

        <p>
            A reliable deployment pipeline should automatically perform at least:
        </p>

        <ol>
            <li>Compile the application</li>
            <li>Run tests</li>
            <li>Perform static analysis</li>
            <li>Check dependencies</li>
            <li>Build the production artifact or container image</li>
            <li>Run security checks</li>
            <li>Deploy to the target environment</li>
        </ol>

        <p>
            Production deployments should be repeatable. If deploying the same version
            requires someone to manually copy files and execute commands, the process is
            difficult to audit and reproduce.
        </p>

        <h2>19. Have a Rollback Strategy</h2>

        <p>
            Deployment is only half of the problem. You also need a plan for when the
            deployment goes wrong.
        </p>

        <p>
            Depending on the architecture, consider rolling deployments, blue-green
            deployments, or canary releases.
        </p>

        <p>
            Database migrations require particular care because application rollback and
            database rollback are not always the same operation.
        </p>

        <h2>20. Production Checklist</h2>

        <p>
            Before calling a Spring Boot application production-ready, I would verify:
        </p>

        <ul>
            <li>✓ Supported Java and Spring Boot versions</li>
            <li>✓ Externalized configuration</li>
            <li>✓ Secrets stored outside source control</li>
            <li>✓ Database migrations enabled</li>
            <li>✓ Hibernate schema changes disabled in production</li>
            <li>✓ Authentication and authorization configured</li>
            <li>✓ Request validation enabled</li>
            <li>✓ Consistent API error responses</li>
            <li>✓ Actuator health checks configured</li>
            <li>✓ Metrics available</li>
            <li>✓ Centralized and structured logging</li>
            <li>✓ Distributed tracing where required</li>
            <li>✓ Database connection pool tuned based on measurements</li>
            <li>✓ External-service timeouts configured</li>
            <li>✓ Graceful shutdown enabled</li>
            <li>✓ Automated tests running in CI</li>
            <li>✓ Dependency and container vulnerability scanning</li>
            <li>✓ Container image runs without unnecessary privileges</li>
            <li>✓ Automated deployment pipeline</li>
            <li>✓ Rollback strategy</li>
            <li>✓ Monitoring and alerting</li>
        </ul>

        <h2>Final Thoughts</h2>

        <p>
            Production-grade Spring Boot is not about adding every possible library or
            copying a large configuration file from another project.
        </p>

        <p>
            It is about making the application <strong>observable, secure, resilient,
            testable, deployable, and recoverable</strong>.
        </p>

        <p>
            Start with the basics—configuration, security, database migrations,
            health checks, logging, metrics, testing, and CI/CD. Then add resilience
            patterns and infrastructure-specific optimizations based on actual
            requirements and production measurements.
        </p>

        <p>
            The best production setup is not the most complicated one. It is the one
            that makes failures visible, deployments repeatable, and operational
            problems recoverable.
        </p>
    `,
});

