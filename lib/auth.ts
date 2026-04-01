// Simple file-based auth for demo
// In production, use a proper auth solution like NextAuth.js or Supabase

import fs from 'fs';
import path from 'path';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

const USERS_FILE = path.join(process.cwd(), '.users.json');

const getUsers = (): Map<string, User & { password: string }> => {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
      return new Map(Object.entries(data));
    }
  } catch (error) {
    console.error('Error reading users file:', error);
  }
  return new Map();
};

const saveUsers = (users: Map<string, User & { password: string }>) => {
  try {
    const data = Object.fromEntries(users);
    fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving users file:', error);
  }
};

export async function registerUser(email: string, password: string, name: string) {
  const users = getUsers();
  
  if (users.has(email)) {
    throw new Error("User already exists");
  }
  
  const user: User & { password: string } = {
    id: Math.random().toString(36).substr(2, 9),
    email,
    name,
    password: Buffer.from(password).toString("base64"), // Simple encoding for demo
  };
  
  users.set(email, user);
  saveUsers(users);
  
  return { id: user.id, email: user.email, name: user.name };
}

export async function loginUser(email: string, password: string) {
  const users = getUsers();
  const user = users.get(email);
  
  if (!user || user.password !== Buffer.from(password).toString("base64")) {
    throw new Error("Invalid credentials");
  }
  
  return { id: user.id, email: user.email, name: user.name };
}

export async function verifyToken(token: string) {
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());
    return decoded;
  } catch {
    return null;
  }
}

export function createToken(user: User) {
  return Buffer.from(JSON.stringify(user)).toString("base64");
}
