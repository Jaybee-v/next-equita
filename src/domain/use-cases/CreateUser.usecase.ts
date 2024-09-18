// import { CreateUserDto } from "../dtos/create-user.dto";
import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  execute(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }
}
