import { UserRepository } from "../repositories/UserRepository";

export class DeleteAccountUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, password: string): Promise<void> {
    return this.userRepository.deleteAccount(id, password);
  }
}
