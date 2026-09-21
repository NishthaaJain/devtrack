import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getIssues = async () => {
  const response = await api.get('/api/issues');
  return response.data;
};

export const createIssue = async (issueData) => {
  const response = await api.post('/api/issues', issueData);
  return response.data;
};

export const updateIssueStatus = async (id, status) => {
  const response = await api.patch(`/api/issues/${id}/status`, { status });
  return response.data;
};

export const deleteIssue = async (id) => {
  const response = await api.delete(`/api/issues/${id}`);
  return response.data;
};

export default api;
