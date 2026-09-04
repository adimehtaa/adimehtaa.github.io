# Adimehta Portfolio — simple clean URL structure

Clean top-level pages:
- `/`
- `/about`
- `/posts`
- `/projects`
- `/projects/fs`

The project and post data remain in `assets/js/content/`, so adding content does not require creating a new page folder.

Project filters are driven by the URL. Add categories such as `fs`, `backend`, `distributed`, `java`, or `spring` to each project.

Posts and projects are sorted newest-first using their `date` field.

Run `npm install` and then `npm run check` to format/lint with Biome.
