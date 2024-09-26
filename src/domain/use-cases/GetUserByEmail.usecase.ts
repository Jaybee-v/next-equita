import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export class GetUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string): Promise<User> {
    return this.userRepository.getUserByEmail(email);
  }
}
