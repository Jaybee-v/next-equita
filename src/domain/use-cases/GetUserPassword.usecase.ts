import { UserRepository } from "../repositories/UserRepository";

export class GetUserPasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string) {
    return this.userRepository.getUserPassword(id);
  }
}
