import { Address } from "./Address";

export interface User {
  id: string;
  email: string;
  name: string;
  lastname?: string;
  level?: number;
  role: string;
  address?: Address;
  createdAt: string;
  updatedAt: string;
}
