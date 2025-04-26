import { User, Contact } from '../types';

// User-related functions
export const getUsers = (): User[] => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

export const updateUser = (user: User): void => {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === user.id);
  if (index !== -1) {
    users[index] = user;
    localStorage.setItem('users', JSON.stringify(users));
  }
};

export const getUserByEmailOrUsername = (emailOrUsername: string): User | undefined => {
  const users = getUsers();
  return users.find((user) => 
    user.email === emailOrUsername || user.username === emailOrUsername
  );
};

// Contact-related functions
export const getContacts = (): Contact[] => {
  const contacts = localStorage.getItem('contacts');
  return contacts ? JSON.parse(contacts) : [];
};

export const saveContact = (contact: Contact): void => {
  const contacts = getContacts();
  contacts.push(contact);
  localStorage.setItem('contacts', JSON.stringify(contacts));
};

// Auth-related functions
export const saveAuthState = (userId: string): void => {
  localStorage.setItem('authState', userId);
};

export const getAuthState = (): string | null => {
  return localStorage.getItem('authState');
};

export const clearAuthState = (): void => {
  localStorage.removeItem('authState');
};

// Get current logged-in user
export const getCurrentUser = (): User | null => {
  const userId = getAuthState();
  if (!userId) return null;
  
  const users = getUsers();
  return users.find((user) => user.id === userId) || null;
};