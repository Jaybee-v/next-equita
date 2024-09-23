import { UserRepository } from "../repositories/UserRepository";

export class GetUserByNameUseCase {
  constructor(private userRepository: UserRepository) {}

  execute(name: string) {
    return this.userRepository.getUserByName(name);
  }
}
