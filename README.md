# PyPractice — Python Practice Platform

A focused, serverless client-side web application for learning and mastering Python through hands-on problem solving.

## Features

- **Monaco Code Editor**: Full-featured VS Code editor in the browser with Python syntax highlighting, auto-indentation, bracket matching, line numbers, and keyboard shortcuts (`Ctrl+Enter` to Run, `Ctrl+Shift+Enter` to Submit).
- **Safe Web Worker Execution**: Python executes in a dedicated Web Worker using Pyodide (WebAssembly), protected by a 7-second execution timeout to prevent infinite loop tab freezes.
- **Multi-Test Case Evaluation**: Real sample and test cases per question with visual diffs and milliseconds execution timers.
- **Virtual File System**: Pre-populated virtual filesystem in Pyodide for file handling challenges.
- **18 Topics & 162 Questions**: 3 difficulty levels (Basic, Intermediate, Advanced) across all core Python subjects.
- **Gamification & Persistence**: Streaks, daily goals (0/3), topic progress tracking, and autosaved code per problem via `localStorage`.
- **Responsive Dark/Light Mode**: Styled with Tailwind CSS and a custom paper/ink editorial theme.

## Pages

- `index.html` — Landing page with stats, resume card, and roadmap
- `topics.html` — Topic library and live search/filter
- `practice.html` — Topic + difficulty question list
- `problem.html` — Monaco coding workspace and test runner
- `progress.html` — Analytics dashboard
- `guide.html` — 5-stage Python roadmap

## How to Run

Simply open `index.html` in any modern web browser. For the best development experience with Web Workers, serve the directory via any local HTTP server (e.g. `npx serve`, `python -m http.server`, or VS Code Live Server).
