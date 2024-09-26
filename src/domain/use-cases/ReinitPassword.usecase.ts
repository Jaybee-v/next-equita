import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export class ReinitPasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, password: string): Promise<User> {
    return this.userRepository.reinitPassword(id, password);
  }
}
