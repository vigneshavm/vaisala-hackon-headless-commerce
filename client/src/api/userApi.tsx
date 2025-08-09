// import type { any } from '@shared/types/user';

export const getUsers = async (): Promise<any[]> => {
  const res = await fetch('http://localhost:5000/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

export const addUser = async (user: any): Promise<any> => {
  const res = await fetch('http://localhost:5000/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Failed to add user');
  return res.json();
};

// src/api/authApi.ts
export const login = async (credentials: { email: string; password: string }) => {
  const res = await fetch('http://localhost:5000/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include', // important if using HttpOnly cookies for session
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'Login failed');
  }

  return res.json(); // could be { token, user }, or { message: 'ok' }
};
