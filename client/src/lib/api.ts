type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
};

async function fetchAPI(endpoint: string, options: RequestOptions = {}) {
  const { method = 'GET', headers = {}, body } = options;
  
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`/api${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'An error occurred' }));
    throw new Error(error.error || 'An error occurred');
  }

  return response.json();
}

export const api = {
  auth: {
    register: (data: { email: string; password: string; firstName: string; lastName: string; role: string }) =>
      fetchAPI('/auth/register', { method: 'POST', body: data }),
    login: (email: string, password: string) =>
      fetchAPI('/auth/login', { method: 'POST', body: { email, password } }),
  },

  gyms: {
    getAll: (status?: string) => 
      fetchAPI(`/gyms${status ? `?status=${status}` : ''}`),
    getById: (id: string) => 
      fetchAPI(`/gyms/${id}`),
    create: (data: any) => 
      fetchAPI('/gyms', { method: 'POST', body: data }),
    update: (id: string, data: any) => 
      fetchAPI(`/gyms/${id}`, { method: 'PATCH', body: data }),
    approve: (id: string) => 
      fetchAPI(`/gyms/${id}/approve`, { method: 'PATCH' }),
    reject: (id: string) => 
      fetchAPI(`/gyms/${id}/reject`, { method: 'PATCH' }),
    delete: (id: string) => 
      fetchAPI(`/gyms/${id}`, { method: 'DELETE' }),
  },

  exercises: {
    getAll: () => 
      fetchAPI('/exercises'),
    getById: (id: string) => 
      fetchAPI(`/exercises/${id}`),
    create: (data: any) => 
      fetchAPI('/exercises', { method: 'POST', body: data }),
    update: (id: string, data: any) => 
      fetchAPI(`/exercises/${id}`, { method: 'PATCH', body: data }),
    delete: (id: string) => 
      fetchAPI(`/exercises/${id}`, { method: 'DELETE' }),
  },

  challenges: {
    getAll: (status?: string) => 
      fetchAPI(`/challenges${status ? `?status=${status}` : ''}`),
    getById: (id: string) => 
      fetchAPI(`/challenges/${id}`),
    create: (data: any) => 
      fetchAPI('/challenges', { method: 'POST', body: data }),
    join: (id: string, userId: string) => 
      fetchAPI(`/challenges/${id}/join`, { method: 'POST', body: { userId } }),
    updateStatus: (id: string, status: string) => 
      fetchAPI(`/challenges/${id}/status`, { method: 'PATCH', body: { status } }),
    delete: (id: string) => 
      fetchAPI(`/challenges/${id}`, { method: 'DELETE' }),
    getParticipants: (id: string) => 
      fetchAPI(`/challenges/${id}/participants`),
  },

  badges: {
    getAll: () => 
      fetchAPI('/badges'),
    getById: (id: string) => 
      fetchAPI(`/badges/${id}`),
    create: (data: any) => 
      fetchAPI('/badges', { method: 'POST', body: data }),
    award: (userId: string, badgeId: string) => 
      fetchAPI('/badges/award', { method: 'POST', body: { userId, badgeId } }),
    delete: (id: string) => 
      fetchAPI(`/badges/${id}`, { method: 'DELETE' }),
  },

  users: {
    getAll: () => 
      fetchAPI('/users'),
    getById: (id: string) => 
      fetchAPI(`/users/${id}`),
    getBadges: (id: string) => 
      fetchAPI(`/users/${id}/badges`),
    getChallenges: (id: string) => 
      fetchAPI(`/users/${id}/challenges`),
    getSessions: (id: string) => 
      fetchAPI(`/users/${id}/sessions`),
    getPoints: (id: string) => 
      fetchAPI(`/users/${id}/points`),
    deactivate: (id: string) => 
      fetchAPI(`/users/${id}/deactivate`, { method: 'PATCH' }),
    activate: (id: string) => 
      fetchAPI(`/users/${id}/activate`, { method: 'PATCH' }),
    delete: (id: string) => 
      fetchAPI(`/users/${id}`, { method: 'DELETE' }),
  },

  training: {
    createSession: (data: any) => 
      fetchAPI('/training/sessions', { method: 'POST', body: data }),
    getLeaderboard: (limit: number = 10) => 
      fetchAPI(`/training/leaderboard?limit=${limit}`),
  },
};
