import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "../entities/User";

export interface UserRepository {
  save(user: CreateUserDto): Promise<User>;
  getUserByName(
    name: string
  ): Promise<User[] | { message: string; users: User[] }>;
  getUserById(id: string): Promise<User>;
  updateAccount(
    id: string,
    updatedUser: { name: string; lastname?: string; email: string }
  ): Promise<User>;
}
