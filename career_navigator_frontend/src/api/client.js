//
// Simple API client with token handling and base URL configuration.
// Uses fetch API and injects Authorization header when a token is present.
// PUBLIC_INTERFACE
export class ApiClient {
  /** Base URL for backend, read from env REACT_APP_API_BASE or defaults to relative / */
  constructor(baseUrl = process.env.REACT_APP_API_BASE || '') {
    this.baseUrl = baseUrl.replace(/\/+$/, '');
  }

  // PUBLIC_INTERFACE
  setToken(token) {
    /** Set or clear bearer token for subsequent requests */
    this.token = token || null;
  }

  // PUBLIC_INTERFACE
  async request(path, { method = 'GET', body, headers = {}, auth = true } = {}) {
    /** Perform a JSON request to the backend with standardized error handling */
    const url = `${this.baseUrl}${path}`;
    const finalHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };
    if (auth && this.token) {
      finalHeaders.Authorization = `Bearer ${this.token}`;
    }
    const resp = await fetch(url, {
      method,
      headers: finalHeaders,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
    });
    const contentType = resp.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const data = isJson ? await resp.json().catch(() => ({})) : await resp.text();
    if (!resp.ok) {
      const error = new Error(typeof data === 'string' ? data : data?.detail || 'Request failed');
      error.status = resp.status;
      error.data = data;
      throw error;
    }
    return data;
  }

  // Auth endpoints
  // PUBLIC_INTERFACE
  login(email, password) {
    /** Authenticate and receive an access token. Returns {access_token, token_type} */
    return this.request('/auth/login', {
      method: 'POST',
      body: { email, password },
      auth: false,
    });
  }

  // PUBLIC_INTERFACE
  register(payload) {
    /** Register a new user. Returns UserPublic */
    return this.request('/auth/register', {
      method: 'POST',
      body: payload,
      auth: false,
    });
  }

  // PUBLIC_INTERFACE
  me() {
    /** Get current user profile */
    return this.request('/auth/me');
  }

  // Public datasets/resources
  // PUBLIC_INTERFACE
  listRoles() {
    return this.request('/roles/');
  }
  // PUBLIC_INTERFACE
  competencyDefinitions() {
    return this.request('/competencies/definitions');
  }
  // PUBLIC_INTERFACE
  competencyMatrix() {
    return this.request('/competencies/matrix');
  }
  // PUBLIC_INTERFACE
  adjacencyVsCA() {
    return this.request('/adjacency/vs-ca');
  }
  // PUBLIC_INTERFACE
  adjacencyMatrix() {
    return this.request('/adjacency/matrix');
  }
  // PUBLIC_INTERFACE
  listResources() {
    return this.request('/resources/');
  }
  // PUBLIC_INTERFACE
  recommendationsForCA({ min_overlap = 55, limit = 10 } = {}) {
    const qs = new URLSearchParams({ min_overlap, limit }).toString();
    return this.request(`/recommendations/for-ca?${qs}`);
  }

  // Auth-protected
  // PUBLIC_INTERFACE
  listJobs() {
    return this.request('/jobs/');
  }
  // PUBLIC_INTERFACE
  addJob(job) {
    return this.request('/jobs/', { method: 'POST', body: job });
  }
  // PUBLIC_INTERFACE
  listProgress() {
    return this.request('/progress/');
  }
  // PUBLIC_INTERFACE
  addProgress(item) {
    return this.request('/progress/', { method: 'POST', body: item });
  }
}

export const apiClient = new ApiClient();
