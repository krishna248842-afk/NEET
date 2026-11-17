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

The bundled bank contains 360 original, NCERT-aligned practice items (36 foundational concepts expressed in 10 prompt formats each, across 32 chapter headings; three stages: Class 11, Class 12, and NEET-pattern practice), with four options and explanations. It is a useful starter practice set, not a complete line-by-line question bank for every NCERT sentence or a substitute for textbook coverage. These are not a verbatim copy of NCERT and the NEET-pattern prompts are not represented as verified official previous-year questions. The app supports creating, editing, and deleting your own questions. Use NCERT textbooks and official exam resources as the source of truth. No app or question bank can guarantee qualifying an exam.

## Data and privacy

This version intentionally has no login or cloud account. Data is saved in `localStorage` in the current browser profile, remains on that device, and is not automatically synced or backed up. Clearing browser/app storage can erase it; export/backup is not yet included. Use the same installed app/browser profile to keep seeing your saved work.
