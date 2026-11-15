# Kindergarten Ready. Vaccine Protected.

A student-led community awareness website about kindergarten immunization in Cherokee County, Georgia. The site is built as a set of static HTML pages, styled with Tailwind CSS, and uses a small amount of vanilla JavaScript for navigation, demo accounts, and parent feedback.

## What’s on the site

- `index.html` — project introduction and reported county immunization figures.
- `issue.html` and `decline.html` — background on the kindergarten immunization gap and factors that may contribute to it.
- `vaccines.html` and `resources.html` — information about school-entry vaccines and links to public-health resources.
- `voices.html` — parent feedback form and community feedback information.
- `about.html` — initiative and contact information.
- `login.html` and `register.html` — demo sign-in and account creation pages.

The site reports that 83.81% of Cherokee County kindergarteners are up to date, compared with a 95% public-health benchmark, and cites the Southern Alliance for Public Health Leadership. The benchmark is not a legal school-entry requirement; see the linked Georgia resources for current requirements.

## Run locally

Requirements: Node.js and npm.

```sh
npm install
npm run build:css
python3 -m http.server 8000
```

Open <http://localhost:8000> in a browser. Keep the server running while you work. After editing styles or HTML that uses Tailwind utility classes, rebuild the stylesheet with `npm run build:css`. To rebuild it automatically while editing, run `npm run watch:css` in a separate terminal instead.

The generated stylesheet is `css/site.css`. The available npm scripts are `build:css` and `watch:css`; there are no `dev` or `build` scripts in the current package configuration.

## Making changes

- Edit the relevant page file (for example, `vaccines.html` for vaccine information).
- Edit `src/input.css` for shared Tailwind components and base styles.
- Edit `tailwind.config.js` for Tailwind theme settings and scanned HTML/source paths. The current configuration scans the root-level HTML pages.
- Edit `js/site.js` for the navigation menu and demo form/account behavior.
- Rebuild `css/site.css` after changes to Tailwind styles or utility classes.
- Check the affected page in a browser, including mobile-sized layouts and relevant form flows.

Keep vaccine information and statistics linked to reliable sources, and verify that requirements and data are current before updating them.

## Demo account and feedback behavior

Accounts, the current demo session, and submitted feedback are stored in the visitor’s browser using `localStorage`; they are not sent to a server. Passwords are hashed in the browser, but this is not production authentication or secure data storage. Do not use the demo to collect real personal or sensitive information. A production launch requires a properly secured backend and an updated privacy notice.

## Git workflow

From the repository directory, create a branch before making changes:

```sh
git status
git switch -c feature/describe-your-change
```

After editing and checking the application, stage the files you changed, review the staged diff, commit, and push the branch:

```sh
git add README.md
git diff --staged
git commit -m "Describe your change"
git push -u origin feature/describe-your-change
```

Replace `README.md` with the paths of the files you changed (you can stage multiple paths in the same `git add` command). Open a pull request on GitHub to propose merging the branch. If you are continuing work on an existing branch, switch to that branch instead of creating a new one.
