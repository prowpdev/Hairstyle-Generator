
export enum Role {
  USER = 'USER',
  SUPERADMIN = 'SUPERADMIN',
}

export interface User {
  id: string;
  email: string;
  role: Role;
  credits: number;
}

export enum View {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  USER_DASHBOARD = 'USER_DASHBOARD',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  BILLING = 'BILLING',
}

export interface CreditPackage {
    id: number;
    credits: number;
    price: number;
    name: string;
}

export interface HairstyleTemplate {
  id: string;
  name: string;
  imageUrl: string;
  prompt: string;
}
