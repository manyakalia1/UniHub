// EventSync API Client for RM Enterprises REST Server
const API_BASE_URL = 'http://localhost:5000/api/v1';

// Helper for HTTP requests
async function apiRequest(endpoint, method = 'GET', body = null, token = null) {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn(`[API Client] Endpoint ${endpoint} unreachable. Using fallback storage.`, error);
    return null;
  }
}

// 1. Fetch Events
export async function getAPIEvents(category = 'all', search = '') {
  const params = new URLSearchParams();
  if (category && category !== 'all') params.append('category', category);
  if (search) params.append('search', search);

  const query = params.toString() ? `?${params.toString()}` : '';
  const result = await apiRequest(`/events${query}`);
  return result && result.success ? result.data : null;
}

// 2. Register for Event
export async function registerAPIEvent(eventId, studentData) {
  const result = await apiRequest(`/events/${eventId}/register`, 'POST', studentData);
  return result;
}

// 3. Create Event Proposal
export async function createAPIEvent(eventPayload) {
  const result = await apiRequest('/events', 'POST', eventPayload);
  return result;
}

// 4. Update Event Approval Status (Admin)
export async function updateAPIEventStatus(eventId, status) {
  const result = await apiRequest(`/events/${eventId}/status`, 'PATCH', { status });
  return result;
}

// 5. Fetch Clubs
export async function getAPIClubs() {
  const result = await apiRequest('/clubs');
  return result && result.success ? result.data : null;
}

// 6. Fetch Notices
export async function getAPINotices() {
  const result = await apiRequest('/notices');
  return result && result.success ? result.data : null;
}

// 7. Post Notice (Admin)
export async function postAPINotice(noticePayload) {
  const result = await apiRequest('/notices', 'POST', noticePayload);
  return result;
}

// 8. User Login (Admin & Club Lead)
export async function loginAPIUser(username, password) {
  const result = await apiRequest('/auth/login', 'POST', { username, password });
  return result;
}
