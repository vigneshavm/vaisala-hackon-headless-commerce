
export interface User {
  id?: string; 
  name?: string;
  email: string;
  password?: string; 
}

export interface LoginResponse {
  token: string;
  user: Omit<User, 'password'>; 
}
