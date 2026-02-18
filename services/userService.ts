
import { User, Role } from '../types';

export const defaultUsers: User[] = [
  {
    id: 'superadmin_1',
    email: 'admin@example.com',
    role: Role.SUPERADMIN,
    credits: 9999,
  },
  {
    id: 'user_1',
    email: 'user@example.com',
    role: Role.USER,
    credits: 25,
  },
];

export const getUsers = (): User[] => {
  const usersJson = localStorage.getItem('users');
  if (!usersJson) {
    return defaultUsers;
  }
  return JSON.parse(usersJson) as User[];
};

export const saveUsers = (users: User[]): void => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const updateUser = (updatedUser: User): User => {
  let users = getUsers();
  users = users.map(user => (user.id === updatedUser.id ? updatedUser : user));
  saveUsers(users);
  
  // Also update currentUser if it's the same user
  const currentUserJson = localStorage.getItem('currentUser');
  if (currentUserJson) {
      const currentUser = JSON.parse(currentUserJson);
      if (currentUser.id === updatedUser.id) {
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }
  }

  return updatedUser;
};

export const addCredits = (userId: string, amount: number): User => {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  if (!user) {
    throw new Error("User not found");
  }
  user.credits += amount;
  return updateUser(user);
};

export const deductCredits = (userId: string, amount: number): User => {
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.credits < amount) {
        throw new Error("Insufficient credits");
    }
    user.credits -= amount;
    return updateUser(user);
};
