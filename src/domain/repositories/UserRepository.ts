import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "../entities/User";

export interface UserRepository {
  save(user: CreateUserDto): Promise<User>;
  getUserByName(
    name: string
  ): Promise<User[] | { message: string; users: User[] }>;
}
