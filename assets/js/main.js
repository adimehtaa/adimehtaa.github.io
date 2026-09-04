/* Shared rendering logic. Keep site data in source-data.js and content files. */

const ICONS = {
    mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 5h18v14H3z"/><path d="m3 6 9 7 9-7"/></svg>`,
    github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.4-5.28 5.69.42.36.78 1.08.78 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.64h.05c.53-.95 1.83-1.96 3.77-1.96 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21H9z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.9c-.7.32-1.46.53-2.25.63a3.9 3.9 0 0 0 1.72-2.16 7.9 7.9 0 0 1-2.5.96A3.9 3.9 0 0 0 12.1 8.6c0 .3.04.6.1.88A11.1 11.1 0 0 1 3.9 4.9a3.9 3.9 0 0 0 1.21 5.2 3.9 3.9 0 0 1-1.77-.49v.05a3.9 3.9 0 0 0 3.13 3.83c-.33.09-.68.14-1.04.14-.25 0-.5-.02-.74-.07a3.9 3.9 0 0 0 3.64 2.7A7.83 7.83 0 0 1 2 18.4a11.05 11.05 0 0 0 6 1.76c7.2 0 11.14-5.97 11.14-11.14l-.01-.5A7.95 7.95 0 0 0 22 5.9Z"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.5-.45-5.2a2.9 2.9 0 0 0-2.05-2.05C18.8 4.3 12 4.3 12 4.3s-6.8 0-8.5.45A2.9 2.9 0 0 0 1.45 6.8C1 8.5 1 12 1 12s0 3.5.45 5.2a2.9 2.9 0 0 0 2.05 2.05c1.7.45 8.5.45 8.5.45s6.8 0 8.5-.45a2.9 2.9 0 0 0 2.05-2.05C23 15.5 23 12 23 12Z" opacity="0"/><path d="M23 12s0-3.5-.45-5.2a2.9 2.9 0 0 0-2.05-2.05C18.8 4.3 12 4.3 12 4.3s-6.8 0-8.5.45A2.9 2.9 0 0 0 1.45 6.8C1 8.5 1 12 1 12s0 3.5.45 5.2a2.9 2.9 0 0 0 2.05 2.05c1.7.45 8.5.45 8.5.45s6.8 0 8.5-.45a2.9 2.9 0 0 0 2.05-2.05C23 15.5 23 12 23 12Z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M9.8 15.3V8.7l5.7 3.3z"/></svg>`,
    mastodon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7 2 3.6 3 3.6 8.2v3.1C3.6 17 6.6 18.6 10 18.9c-.5.8-.5 1.5-.4 2.1-2.1.3-4.2-.4-5.4-2.2 0 0-.3-.5-.9-.5-.7 0-.5.5-.4.7.5 1.3 2.5 3.2 5.6 3.2 0 .5 0 .8.1 1.1h5.5c.1-1 .1-2.1.1-2.7 3.6-.6 6.2-2.5 6.2-6.6V8.2C20.4 3 17 2 12 2Zm5 9.3c0 .5-.4.9-.9.9s-.9-.4-.9-.9V8.5c0-1.3-.5-2-1.6-2s-1.6.7-1.6 2v3.3h-2V8.5c0-1.3-.5-2-1.6-2s-1.6.7-1.6 2v2.8c0 .5-.4.9-.9.9s-.9-.4-.9-.9V8.3c0-2.6 1.6-4.1 3.9-4.1 1.3 0 2.3.5 2.9 1.5.6-1 1.6-1.5 2.9-1.5 2.3 0 3.9 1.5 3.9 4.1v3Z"/></svg>`,
    soundcloud: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.5 10.2v6.4h9.8c1.7 0 3-1.3 3-3s-1.3-3-3-3c-.3 0-.6 0-.9.1-.4-2.5-2.6-4.4-5.2-4.4-1.5 0-2.8.6-3.7 1.7v2.2Zm-1.4 6.4h.9v-6c-.3-.1-.6-.1-.9 0v6Zm-1.7 0h.9v-5.4c-.3.1-.6.3-.9.5v4.9Zm-1.7 0h.9v-4.2c-.3.2-.6.5-.9.8v3.4Z"/></svg>`,
    bandcamp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 17.5 8.8 6.5H22l-6.8 11Z"/></svg>`,
    moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"/></svg>`,
    sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>`,
    arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
    rss: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="5" cy="19" r="1.5" fill="currentColor" stroke="none"/><path d="M4 10a10 10 0 0 1 10 10"/><path d="M4 4a16 16 0 0 1 16 16"/></svg>`,
    calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="5" width="17" height="15.5" rx="1.5"/><path d="M7 3.5v3M17 3.5v3M3.5 9h17"/></svg>`,
};

function initTheme() {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches;
    const dark = stored ? stored === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
}
initTheme();

function updateThemeIcon() {
    const btn = document.getElementById("theme-toggle-icon");
    if (!btn) return;
    const dark = document.documentElement.classList.contains("dark");
    btn.innerHTML = dark ? ICONS.sun : ICONS.moon;
    btn.setAttribute(
        "aria-label",
        dark ? "Switch to light mode" : "Switch to dark mode",
    );
    btn.setAttribute(
        "title",
        dark ? "Switch to light mode" : "Switch to dark mode",
    );
}

function toggleTheme() {
    const dark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    updateThemeIcon();
}

function renderIntro() {
    const roleLine = SITE.roleUrl
        ? `<a href="${SITE.roleUrl}">${SITE.role}</a>`
        : SITE.role;
    return `
    <p>Hi 👋 My name is ${SITE.name}. I work as a ${roleLine}.</p>
    <p>${SITE.intro}<a href="/about">${SITE.aboutLinkText}</a>${SITE.aboutExtra}</p>
  `;
}

function renderHeader(active) {
    const items = [
        { href: "/about", label: "About", key: "about" },
        { href: "/projects", label: "Projects", key: "projects" },
        { href: "/posts", label: "Posts", key: "posts" },
    ];
    return `
  <header class="site-header">
    <div class="header-inner">
        <a class="logo" href="/">
            <img src="/favicon.svg" alt="${SITE.title}" class="logo-mark" />
            ${SITE.title}
        </a>
        <nav class="main-nav">
            ${items
                .map(
                    (i) =>
                        `<a href="${i.href}" class="${i.key === active ? "active" : ""}">${i.label}</a>`,
                )
                .join("")}
            <button class="icon-btn" onclick="toggleTheme()" aria-label="Toggle dark mode" id="theme-toggle-icon">
            ${ICONS.moon}
            </button>
        </nav>
    </div>
  </header>`;
}

function renderFooter() {
    return `
  <footer class="site-footer">
    <div class="footer-inner">
      <a href="/feed.xml" class="rss-link" aria-label="RSS feed" title="RSS feed">${ICONS.rss}</a> &nbsp;|&nbsp; <a href="#">Privacy Policy</a> &nbsp;|&nbsp; &copy; ${SITE.year} ${SITE.license}
    </div>
  </footer>`;
}

function renderSocials() {
    return `<div class="socials">
    ${SOCIALS.map(
        (s) =>
            `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}">${ICONS[s.icon] || ""}</a>`,
    ).join("")}
  </div>`;
}

function getPostDateText(post) {
    if (!post) return "";
    if (post.time) return `${post.date || ""} | at ${post.time}`;
    return post.date || "";
}

function renderPostItem(post) {
    return `
  <div class="post-item">
    <h3><a href="/post/?slug=${encodeURIComponent(post.slug)}">${escapeHtml(post.title)}</a></h3>
    <div class="post-meta">${ICONS.calendar}<em>${escapeHtml(getPostDateText(post))}</em></div>
    <p class="post-summary">${escapeHtml(post.summary || "")}</p>
  </div>`;
}
function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function renderProjectLink(url, label, className = "") {
    if (!url) return "";
    const external = /^https?:\/\//i.test(url);
    return `<a class="project-link ${className}" href="${escapeHtml(url)}"${external ? ' target="_blank" rel="noopener"' : ""}>${escapeHtml(label)}</a>`;
}

function renderProjectCard(project) {
    const image = project.image
        ? `<button class="project-image-trigger" type="button" data-lightbox-src="${escapeHtml(project.image)}" data-lightbox-alt="${escapeHtml(project.name)} preview" aria-label="Open ${escapeHtml(project.name)} image">
         <div class="project-thumb" style="background-image:url('${escapeHtml(project.image)}')" role="img" aria-label="${escapeHtml(project.name)} preview"></div>
       </button>`
        : `<div class="project-thumb project-thumb-placeholder"><span>project preview</span></div>`;

    const tech =
        Array.isArray(project.tech) && project.tech.length
            ? `<div class="project-tech">${project.tech.map(escapeHtml).join(", ")}</div>`
            : "";

    return `
    <article class="project-card">
      ${image}
      <div class="project-body">
        <h3><a href="/project/?slug=${encodeURIComponent(project.slug)}">${escapeHtml(project.name)}</a></h3>
        ${tech}
        <p>${escapeHtml(project.summary || "")}</p>
        <p><a class="all-posts-link" href="/project/?slug=${encodeURIComponent(project.slug)}">Read project ${ICONS.arrowRight}</a></p>
      </div>
    </article>`;
}

function renderProjectList(projects) {
    if (!projects.length) {
        return `<p style="color:var(--muted);font-style:italic;">No projects yet — check back soon.</p>`;
    }
    return `<div class="projects-grid">${projects.map(renderProjectCard).join("")}</div>`;
}

function sortByDateNewest(items) {
    return [...items].sort((a, b) => {
        const dateA = Date.parse(a.date || "") || 0;
        const dateB = Date.parse(b.date || "") || 0;
        return dateB - dateA;
    });
}

function selectHomepageItems(items, limit) {
    return sortByDateNewest(items).slice(0, limit);
}

function getProjectFilterFromUrl() {
    const parts = window.location.pathname
        .replace(/\/+$/, "")
        .split("/")
        .filter(Boolean);
    return parts[0] === "projects" && parts[1] ? parts[1].toLowerCase() : "";
}

function getProjectsForFilter(filter) {
    const projects = sortByDateNewest(PROJECTS);
    if (!filter) return projects;
    return projects.filter((project) =>
        (project.categories || [])
            .map(String)
            .map((x) => x.toLowerCase())
            .includes(filter),
    );
}

function renderProjectFilters(activeFilter) {
    const filters = [
        { slug: "", label: "All" },
        { slug: "fs", label: "Full Stack" },
        { slug: "backend", label: "Backend" },
    ];
    return `<div class="project-filters">${filters
        .map((filter) => {
            const href = filter.slug ? `/projects/${filter.slug}` : "/projects";
            const active = filter.slug === activeFilter ? "active" : "";
            return `<a class="project-filter ${active}" href="${href}">${filter.label}</a>`;
        })
        .join("")}</div>`;
}

function renderProjectPage(project) {
    if (!project) {
        return {
            title: "Project not found",
            crumb: "Not found",
            body: `<p>There is no project with this URL.</p>`,
        };
    }

    const image = project.image
        ? `<button class="project-hero-image-trigger" type="button" data-lightbox-src="${escapeHtml(project.image)}" data-lightbox-alt="${escapeHtml(project.name)} preview" aria-label="Open ${escapeHtml(project.name)} image">
         <img class="project-hero-image" src="${escapeHtml(project.image)}" alt="${escapeHtml(project.name)} preview" />
       </button>`
        : `<div class="project-thumb project-thumb-placeholder project-hero-placeholder"><span>project preview</span></div>`;

    const tech =
        Array.isArray(project.tech) && project.tech.length
            ? `<section class="project-meta-section"><h3>Technology</h3><p class="project-tech project-tech-detail">${project.tech.map(escapeHtml).join(", ")}</p></section>`
            : "";

    const links = [
        renderProjectLink(project.links?.live, "Live preview"),
        renderProjectLink(project.links?.github, "GitHub"),
    ]
        .filter(Boolean)
        .join("");

    return {
        title: project.name,
        crumb: project.name,
        body: `
      ${image}
      <div class="project-page-header">
        <div>
          <h1>${escapeHtml(project.name)}</h1>
          <p class="project-lead">${escapeHtml(project.summary || "")}</p>
        </div>
        ${links ? `<div class="project-actions">${links}</div>` : ""}
      </div>
      ${tech}
      <div class="project-content">${project.body || ""}</div>
    `,
    };
}

function renderExperience() {
    return EXPERIENCE.map(
        (job) => `
    <div class="experience-item">
      <h3>${job.role} <span class="experience-company">· ${job.company}</span></h3>
      <div class="post-meta">${[job.location, job.period].filter(Boolean).join(" — ")}</div>
      <ul>
        ${job.bullets.map((b) => `<li>${b}</li>`).join("")}
      </ul>
    </div>`,
    ).join("");
}

function renderSkills() {
    return `<div class="skills-grid">
    ${SKILLS.map(
        (group) => `
      <div class="skills-group">
        <h3>${group.category}</h3>
        <p>${group.items.join(", ")}</p>
      </div>`,
    ).join("")}
  </div>`;
}

function renderEducation() {
    return EDUCATION.map(
        (ed) => `
    <div class="experience-item">
      <h3>${ed.school}</h3>
      <div class="post-meta">${[ed.location, ed.period].filter(Boolean).join(" — ")}</div>
      <p>${ed.degree}</p>
    </div>`,
    ).join("");
}

function initLightbox() {
    if (document.getElementById("image-lightbox")) return;

    document.body.insertAdjacentHTML(
        "beforeend",
        `
    <div class="image-lightbox" id="image-lightbox" hidden>
      <button class="image-lightbox-close" type="button" aria-label="Close image">×</button>
      <img class="image-lightbox-img" alt="" />
    </div>
  `,
    );

    const lightbox = document.getElementById("image-lightbox");
    const image = lightbox.querySelector(".image-lightbox-img");
    const close = () => {
        lightbox.hidden = true;
        document.body.classList.remove("lightbox-open");
        image.removeAttribute("src");
    };

    document.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-lightbox-src]");
        if (trigger) {
            image.src = trigger.dataset.lightboxSrc;
            image.alt = trigger.dataset.lightboxAlt || "";
            lightbox.hidden = false;
            document.body.classList.add("lightbox-open");
        }

        if (
            event.target === lightbox ||
            event.target.closest(".image-lightbox-close")
        ) {
            close();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !lightbox.hidden) close();
    });
}
initLightbox();

function mount(id, html) {
    document.getElementById(id).innerHTML = html;
}
