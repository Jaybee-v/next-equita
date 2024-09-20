import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "../entities/User";

export interface UserRepository {
  save(user: CreateUserDto): Promise<User>;
}
