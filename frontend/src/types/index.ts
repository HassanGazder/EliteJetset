export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: "user" | "agent" | "admin";
}

export interface Contact {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  referringAgent: string;
  createdAt: string;
}

export interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (emailOrUsername: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, "id" | "role">) => Promise<boolean>;
  logout: () => void;
}