# MemoNeet

MemoNeet is a private, offline-first NEET Biology study app. It runs as a progressive web app, stores practice progress, bookmarks, personal questions, and notes in the device browser, and does not require an account or internet connection after its first load.

## Run it locally

```bash
npm install
npm run dev
```

For a production build: `npm run build`. The generated site is in `dist/`.

## Install on Android (no APK build needed)

1. Build and publish the `dist/` folder to any HTTPS static host (or run the production preview on your local network).
2. Open the site in Chrome on your Android phone while online once.
3. Use Chrome's menu → **Install app** or **Add to Home screen**. Launch MemoNeet from its new home-screen icon. The service worker caches the app shell for offline use.

A PWA can be used as an app without building an APK. Browsers require HTTPS for service workers, except for localhost.

## Get an Android APK (no Android Studio needed)

A GitHub Actions workflow builds a debug APK for this branch. After the changes are pushed, open the repository on GitHub → **Actions** → **Build MemoNeet Android APK** → latest successful run → **Artifacts** → download `MemoNeet-Android-APK`. Unzip the download to find `app-debug.apk`. On your Android phone, open the APK and allow your browser or Files app to install apps when Android prompts. This is a sideloadable debug APK, not a Play Store release. The workflow can also be started manually from the Actions page using **Run workflow**.

The APK build uses Capacitor and packages the web app locally; once installed, it does not need the preview server or internet to open the app. Your study data stays inside that installation on that phone.

## Content and study note

The bundled bank now contains 450 items. The Living World has 100 individually authored original MCQs, each with four options and an explanation. Most other chapters still contain starter practice prompts built from a smaller set of concepts; this is not yet 300–400 unique questions per chapter and must not be mistaken for complete NCERT coverage. Questions are original and NCERT-aligned, not a verbatim line-by-line reproduction. NEET-pattern items are not represented as verified official previous-year questions. The app supports creating, editing, and deleting your own questions. Use NCERT textbooks and official exam resources as the source of truth. No app or question bank can guarantee qualifying an exam.

## AI completion brief and content validator

- `docs/MASTER_BUILD_PROMPT.md` is a ready-to-paste specification for an AI coding agent. It defines the 400-per-chapter target, copyright-safe original-question rules, app requirements, a chapter inventory audit, and completion gates.
- Run `npm run validate:bank` to see per-chapter counts and fail the build if any chapter is below 400 or contains exact/known templated duplicates. It currently **fails intentionally** because the question bank is incomplete; do not bypass the gate to claim completion.

## Data and privacy

This version intentionally has no login or cloud account. Data is saved in `localStorage` in the current browser profile, remains on that device, and is not automatically synced or backed up. Clearing browser/app storage can erase it; export/backup is not yet included. Use the same installed app/browser profile to keep seeing your saved work.
