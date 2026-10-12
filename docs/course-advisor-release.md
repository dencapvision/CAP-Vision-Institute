# Course Advisor and Pearl & Glass completion

Production is `apps/cap-vision-astro`. Commit 4f1db1b added the old AI island but had not been published. Its storage initializers were unsafe for SSR.

Restored CourseAdvisor-DenMasterFa renders without browser globals, uses safe React text, and keeps session-only history (last 12 turns sent). LINE and AI open one panel at a time. `/courses`, `/contact?source=ai-advisor`, and LINE remain visible. The chat does not write leads; custom design uses the existing validated Contact form.

`/api/course-advisor` uses Gemini 3 Flash (`gemini-3-flash-preview`) with the supplied advisor persona and portfolio. Keys stay on the Worker. Missing credentials/outages/invalid outputs return explicitly labeled basic portfolio guidance. Pricing and direct contact go immediately to LINE. GET reports configuration mode/model; only POST returning `mode: gemini` proves provider operation.

Add `GEMINI_API_KEY` as a production Worker secret or GitHub Actions repository/environment secret. The release installs it when present, preserves existing Worker secrets when absent, and never ships it in browser assets. Optional Worker `COURSE_ADVISOR_MODEL` overrides the default.

Input/history are bounded, only user/assistant roles accepted, cross-origin POST rejected, and native Cloudflare rate limiting allows 30 calls/minute per connecting IP. Shared-network users share this allowance. No dialogue logging or notifications.

Explicit Pearl heroes replace dark/orange headers on Assessment, Services, Courses, Contact, About, Portfolio, Speakers and Resources. The footer diagnostic banner and assessment header use light glass. Assessment calculations/submissions and CRM remain intact. Shared CSS is mirrored to Vite and separate Next Admin; the latter still needs its separate hosting target.

Tests cover validation, direct handoff, new follow-up context, Gemini request construction, missing key, provider outage and invalid output. Browser QA verifies four viewport sizes, exclusive panels, focus and service links. Release verification now requires the restored AI and actual Pearl hero CSS on deployed routes.
