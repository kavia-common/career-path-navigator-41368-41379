Frontend ↔ Backend Integration Notes

Environment
- Frontend: https://vscode-internal-30268-beta.beta01.cloud.kavia.ai:3000
- Backend:  https://vscode-internal-30268-beta.beta01.cloud.kavia.ai:3010

Set in frontend:
- REACT_APP_API_BASE=https://vscode-internal-30268-beta.beta01.cloud.kavia.ai:3010

Backend CORS (to avoid console errors):
- allow_origins: ["https://vscode-internal-30268-beta.beta01.cloud.kavia.ai:3000"]
- allow_credentials: true
- allow_headers: ["*"]
- allow_methods: ["*"]

Auth Flow to validate:
1) Register -> Login -> Protected pages render (Dashboard, Jobs, Progress)
2) Add Job and Progress entries -> see them listed
3) Logout -> redirected to /login; protected routes blocked

Public Data:
- /roles, /resources, /competencies/definitions, /competencies/matrix, /adjacency/*, /recommendations/for-ca

Notes:
- Client sets Authorization: Bearer <token> when logged in.
- fetch uses credentials: 'include' (cookies not required by backend; leave as-is or remove if backend forbids credentials in CORS).
