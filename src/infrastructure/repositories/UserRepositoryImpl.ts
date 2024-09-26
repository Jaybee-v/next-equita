import { CreateUserDto } from "@/domain/dtos/create-user.dto";
import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { userApi } from "../api/user-api";

export class UserRepositoryImpl implements UserRepository {
  async save(user: CreateUserDto): Promise<User> {
    return userApi.save(user);
  }

  async getUserByEmail(email: string): Promise<User> {
    return userApi.getUserByEmail(email);
  }

  async getUserByName(
    name: string
  ): Promise<User[] | { message: string; users: User[] }> {
    return userApi.getUserByName(name);
  }

  async getUserById(id: string): Promise<User> {
    return userApi.getUserById(id);
  }

  async getUserPassword(id: string): Promise<string> {
    return userApi.getUserPassword(id);
  }

  async updateAccount(
    id: string,
    updatedUser: {
      name: string;
      lastname?: string;
      email: string;
    }
  ): Promise<User> {
    return userApi.updateAccount(id, updatedUser);
  }

  async updatePassword(
    id: string,
    actualPassword: string,
    newPassword: string
  ): Promise<User> {
    return userApi.updatePassword(id, actualPassword, newPassword);
  }

  async reinitPassword(id: string, password: string): Promise<User> {
    return userApi.reinitPassword(id, password);
  }

  async deleteAccount(id: string, password: string): Promise<void> {
    return userApi.deleteAccount(id, password);
  }
}
