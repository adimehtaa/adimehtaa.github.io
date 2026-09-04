/* ============================================================
   SITE SOURCE DATA
   Keep site-wide settings here. Posts and projects live in their
   own files under assets/js/content/, so this file stays small.
   ============================================================ */

const SITE = {
    title: "adimehtaa",
    name: "Aditya Mehta",
    role: "Backend Engineer",
    roleUrl: "https://www.inflibnet.ac.in",
    intro: "I'm a backend engineer with experience building and maintaining production web applications and REST APIs — mainly in Java, Spring Boot, and PostgreSQL. This site is where I write about backend engineering and system design, and show the projects I've built. Check out the ",
    aboutLinkText: "about page",
    aboutExtra: " for more info.",
    year: 2026,
    license: "Built quietly. Built well.",
};

const SOCIALS = [
    { icon: "mail", url: "mailto:adityamehta242@gmail.com", label: "Email" },
    { icon: "github", url: "https://github.com/adimehtaa", label: "GitHub" },
    { icon: "linkedin", url: "https://www.linkedin.com/in/adimehtaa/", label: "LinkedIn" },
    {icon: "mastodon", url: "https://mastodon.social/@adimehta", label: "Mastodon"},
    {icon: "x", url: "https://x.com/adimehtaa", label: "X"}
];

const EXPERIENCE = [
    {
        company: "INFLIBNET Centre",
        role: "Programmer",
        location: "Gandhinagar, India",
        period: "Nov 2024 - Present",
        bullets: [
            "Designed and implemented 50+ RESTful APIs using Jersey with service-level authentication and role-based authorization across 3 internal services.",
            "Led an end-to-end migration from Java 8 to Java 21 and Java EE 7 to Jakarta EE 10, resolving 30+ dependency conflicts and reducing average API response latency by approximately 25%.",
            "Owned the frontend migration from Vue 2 to Vue 3 with Vite, reducing production build time from ~60s to ~15s and introducing route-level lazy loading.",
            "Containerized and deployed 4 production applications using Docker and Nginx across 3 Fedora servers, enabling consistent staging and production environments.",
        ],
    },
];

const SKILLS = [
    {
        category: "Languages",
        items: ["Java (8, 17, 21)", "SQL", "JavaScript", "TypeScript"],
    },
    {
        category: "Backend",
        items: [
            "Spring Boot",
            "Spring Security",
            "Spring Data JPA",
            "Jersey",
            "REST APIs",
            "Microservices",
            "Node.js",
        ],
    },
    {
        category: "Databases",
        items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    },
    {
        category: "Security",
        items: ["JWT", "OAuth2", "OIDC", "Keycloak", "RBAC"],
    },
    { category: "Messaging", items: ["Apache Kafka", "RabbitMQ"] },
    {
        category: "DevOps & Tools",
        items: [
            "Docker",
            "Nginx",
            "Linux (Fedora)",
            "Git",
            "Maven",
            "Postman",
            "IntelliJ IDEA",
        ],
    },
];

const EDUCATION = [
    {
        school: "Savitribai Phule Pune University (SPPU)",
        location: "Pune, India",
        degree: "Bachelor of Engineering in Computer Engineering — Specialization: Cyber Security",
        period: "June 2020 - May 2024",
    },
];

const HOME = {
    postsLimit: 4,
    projectsLimit: 4,
    useFeaturedFirst: false,
};

/*
 * CONTENT REGISTRY
 * Add one file here when you create a new post/project.
 * Each file exports its entry by pushing it into the matching array.
 * The actual content no longer lives in this file.
 */
const CONTENT_FILES = {
    posts: [],
    projects: [
        "distributed-notification-engine.js",
    ],
};

const POSTS = [];
const PROJECTS = [];
window.POSTS = POSTS;
window.PROJECTS = PROJECTS;

/*
 * Load content files while the HTML parser is still running. This keeps the
 * site dependency-free and, unlike dynamically injected scripts, also works
 * reliably with simple local servers such as VS Code Live Server.
 */
const CONTENT_BASE = new URL("./content/", document.currentScript.src);
const CONTENT_SCRIPTS = [
    ...CONTENT_FILES.posts.map(
        (file) => new URL(`posts/${file}`, CONTENT_BASE).href,
    ),
    ...CONTENT_FILES.projects.map(
        (file) => new URL(`projects/${file}`, CONTENT_BASE).href,
    ),
];

document.write(
    CONTENT_SCRIPTS.map((src) => `<script src="${src}"><\/script>`).join(""),
);

// Content scripts above execute before the parser continues to main.js.
const DATA_READY = Promise.resolve();

const ABOUT = {
    portrait: "/assets/images/about.png",
    portraitCredit: "",
    portraitCreditUrl: "#",
    paragraphs: [
        `My name is ${SITE.name}, and I work as a <a href="#">backend engineer</a> with 1 year 10 months of professional experience building and maintaining production web applications and REST APIs. I'm experienced in Java, Spring Boot, PostgreSQL, Docker, authentication and authorization, and API performance optimization, with hands-on work in Kafka, Redis, MongoDB, and microservice-based systems.`,
        `Outside of my day job I like building distributed systems projects to go deeper on the tools I use at work — see the <a href="/projects">projects</a> below for a couple of examples.`,
    ],
    websiteHeading: "Website",
    websiteParagraph: `A small hand-built personal website for sharing what I learn, documenting engineering decisions, and showcasing my projects. Built with plain HTML, CSS, and JavaScript, inspired by the simplicity of cp3.io.`,
};
