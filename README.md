# Personal Website

A small static portfolio/blog built with plain HTML, CSS, and JavaScript. There is no build step.

## Structure

- `index.html` — homepage; shows configurable previews of posts and projects.
- `posts.html` — complete post listing.
- `post.html?slug=...` — individual post page.
- `projects.html` — complete project listing.
- `project.html?slug=...` — individual project/case-study page.
- `about.html` — about, experience, skills, education.
- `assets/js/source-data.js` — site configuration, homepage configuration, and the small content registry.
- `assets/js/content/posts/` — one file per post.
- `assets/js/content/projects/` — one file per project.
- `assets/js/main.js` — shared renderer, interactions, and image lightbox.
- `assets/css/style.css` — styling, responsive layout, and dark mode.

## Adding a post

Create a new file in `assets/js/content/posts/`, for example `my-new-post.js`:

```js
window.POSTS.push({
  slug: "my-new-post",
  title: "My New Post",
  date: "September 4, 2026",
  summary: "Short summary.",
  featured: false,
  body: `<p>Full HTML article...</p>`,
});
```

Then add the filename to `CONTENT_FILES.posts` in `assets/js/source-data.js`.

The post automatically appears in `posts.html` and gets its own `post.html?slug=my-new-post` page.

## Adding a project

Create a new file in `assets/js/content/projects/`, for example `my-project.js`:

```js
window.PROJECTS.push({
  slug: "my-project",
  name: "My Project",
  summary: "Short project summary.",
  featured: true,
  image: "assets/images/my-project.png",
  links: { live: "https://example.com", github: "https://github.com/..." },
  tech: ["Java", "Spring Boot", "PostgreSQL"],
  body: `
    <p>Project overview...</p>
    <h2>Architecture</h2>
    <p>...</p>
  `,
});
```

Then add the filename to `CONTENT_FILES.projects` in `assets/js/source-data.js`.

A project is a full page, not an expandable card. Clicking one opens `project.html?slug=my-project`.

## Why content is split into files

Posts and projects are no longer large arrays inside `source-data.js`. Each entry has its own small file, while `source-data.js` only keeps the registry of content files. This keeps the main source file readable as the site grows and makes editing, reviewing, moving, or removing a single post/project much easier.

## Homepage configuration

Change this in `source-data.js`:

```js
const HOME = {
  postsLimit: 4,
  projectsLimit: 4,
  useFeaturedFirst: true,
};
```

When `useFeaturedFirst` is enabled, entries with `featured: true` are shown first, followed by the remaining entries until the configured limit is reached.

## Dark mode

The theme toggle is in the navbar. The site uses the system preference on first visit and then remembers the user's choice in `localStorage`.

The palette uses neutral black/gray accents rather than orange, with a deeper near-black background in dark mode.

## Resume

No resume file has been added yet. A good placement is on the About page, directly below the introduction, with a compact **View Resume** button and an optional **Download PDF** action. Once you approve that placement, add the PDF under `assets/` and link to it from the About page.
