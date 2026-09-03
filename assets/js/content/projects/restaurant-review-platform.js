window.PROJECTS.push({
        slug: "restaurant-review-platform",
        name: "Restaurant Review Platform",
        summary:
            "A searchable restaurant review platform combining full-text search, geo filters, ranking, and centralized identity.",
        featured: true,
        image: "",
        links: {
            live: "",
            github: "#",
        },
        tech: ["Spring Boot", "React", "Elasticsearch", "Keycloak", "PostgreSQL"],
        body: `
      <p>A restaurant review platform with Elasticsearch full-text search, fuzzy matching, geo-location filtering, and multi-criteria ranking. It integrates Keycloak with OAuth2/OIDC for SSO and centralized identity management, with a domain model for ratings, photo uploads, and multi-step review editing.</p>

      <h2>Architecture</h2>
      <p>React client → Spring Boot REST API → domain services → PostgreSQL. Search requests are projected into Elasticsearch for fast text and geo queries, while Keycloak provides identity and access tokens.</p>

      <h2>Search</h2>
      <p>Elasticsearch handles fuzzy matching, relevance scoring, and geo-distance filtering so users can discover restaurants without relying on exact names or addresses.</p>

      <h2>Security</h2>
      <p>Keycloak centralizes authentication and issues OAuth2/OIDC tokens. The API validates those tokens and applies authorization rules at the application boundary.</p>

      <h2>Performance</h2>
      <p>The search model is optimized for read-heavy discovery while PostgreSQL remains the source of truth for transactional restaurant and review data.</p>
    `,
    });
