import type { User, LoginResponse } from '../types/userTypes'; // define your types accordingly
import { API_URL } from '../config';

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch(`${API_URL}/users`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

export const socialLogin = async (providerToken: string): Promise<LoginResponse> => {
  const res = await fetch(`${API_URL}/users/social-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: providerToken }),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Social login failed');
  return res.json();
};

export const signup = async (user: User): Promise<User> => {
  const res = await fetch(`${API_URL}/users/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Signup failed');
  return res.json();
};

export const addUser = async (user: User): Promise<User> => {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Failed to add user');
  return res.json();
};

export const login = async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include',
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'Login failed');
  }

  return res.json();
};
