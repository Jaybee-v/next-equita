import { UserRepository } from "../repositories/UserRepository";

export class UpdatePasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, actualPassword: string, newPassword: string) {
    return this.userRepository.updatePassword(id, actualPassword, newPassword);
  }
}
