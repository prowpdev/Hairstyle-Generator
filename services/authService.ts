
import { User, Role } from '../types';
import { getUsers, saveUsers, defaultUsers } from './userService';

// Initialize with default users if none exist
if (!localStorage.getItem('users')) {
  saveUsers(defaultUsers);
}

export const register = (email: string, password_not_used: string): User => {
  const users = getUsers();
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    throw new Error('User with this email already exists.');
  }
  const newUser: User = {
    id: `user_${Date.now()}`,
    email,
    role: Role.USER,
    credits: 10, // Starting credits
  };
  const updatedUsers = [...users, newUser];
  saveUsers(updatedUsers);
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  return newUser;
};

export const login = (email: string, password_not_used: string): User => {
  const users = getUsers();
  const user = users.find(u => u.email === email);
  if (!user) {
    throw new Error('Invalid credentials.');
  }
  localStorage.setItem('currentUser', JSON.stringify(user));
  return user;
};

export const logout = (): void => {
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('currentUser');
  if (!userJson) {
    return null;
  }
  try {
    return JSON.parse(userJson) as User;
  } catch (error) {
    console.error("Failed to parse current user from localStorage", error);
    return null;
  }
};
