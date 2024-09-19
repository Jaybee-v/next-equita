import { CreateUserDto } from "@/domain/dtos/create-user.dto";
import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { userApi } from "../api/user-api";

export class UserRepositoryImpl implements UserRepository {
  async save(user: CreateUserDto): Promise<User | { error: string }> {
    return userApi.save(user);
  }
}
