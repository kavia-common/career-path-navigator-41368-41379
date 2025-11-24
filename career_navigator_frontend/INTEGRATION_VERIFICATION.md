Frontend ↔ Backend Integration Verification (SQLite)

Environment
- Frontend: https://vscode-internal-30268-beta.beta01.cloud.kavia.ai:3000
- Backend:  https://vscode-internal-30268-beta.beta01.cloud.kavia.ai:3010
- Ensure in frontend .env.local:
  REACT_APP_API_BASE=https://vscode-internal-30268-beta.beta01.cloud.kavia.ai:3010

Backend CORS (required to avoid console errors):
- allow_origins: ["https://vscode-internal-30268-beta.beta01.cloud.kavia.ai:3000"]
- allow_credentials: true
- allow_headers: ["*"]
- allow_methods: ["*"]

What to verify

1) Auth flow
- Visit /register, create a user with password >= 8 chars.
- Visit /login, authenticate with the new account.
- You should be redirected to / and see the top bar with your email/full name.
- Navigate protected pages (Jobs, Progress) without being redirected.
- Click Logout and confirm you’re redirected to /login and protected routes are blocked.

2) Dashboard
- / shows:
  - Roles card count > 0 (GET /roles/)
  - Recommendations card count >= 0 (GET /recommendations/for-ca?limit=5)

3) Public data pages
- Roles (GET /roles/): list of role names (with abbreviations where present)
- Competencies:
  - Glossary (GET /competencies/definitions)
  - Raw matrix in details (GET /competencies/matrix)
- Resources (GET /resources/)
- Recommendations (GET /recommendations/for-ca?min_overlap=55&limit=10)

4) Auth-required pages
- Jobs:
  - GET /jobs/ returns your list (empty if new)
  - POST /jobs/ to add item -> appears in list
- Progress:
  - GET /progress/ returns your list (empty if new)
  - POST /progress/ to add item -> appears in list

5) Network and Console
- Open devtools Network and Console
- No CORS errors
- No unexpected 4xx/5xx on the above endpoints
- All requests go to REACT_APP_API_BASE

Minimal fixes if issues found

A) If requests target wrong host:
- Confirm .env.local has REACT_APP_API_BASE pointing to backend URL
- Restart dev server to pick up env changes

B) If CORS errors (e.g., “has been blocked by CORS policy”):
- Ensure backend CORS config includes:
  - allow_origins: ["https://vscode-internal-30268-beta.beta01.cloud.kavia.ai:3000"]
  - allow_credentials: true (since frontend uses credentials: 'include')
  - headers/methods allow "*"
- Alternative (not preferred): change credentials to 'omit' in src/api/client.js

C) If 401 on /auth/me after login:
- Verify Authorization: Bearer <token> header is present
- Confirm token returned from /auth/login matches backend spec { access_token, token_type }
- Try clearing localStorage (cn_access_token) and re-authenticate

D) If 422 on POST /jobs/ or /progress/:
- Confirm required fields meet backend minLength constraints (see openapi.json)
- Jobs: title, company, status required
- Progress: competency, level required

Note
- A smoke test was adjusted to avoid false negatives unrelated to integration.
