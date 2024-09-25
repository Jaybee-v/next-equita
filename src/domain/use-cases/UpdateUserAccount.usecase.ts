import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export class UpdateUserAccount {
  constructor(private userRepository: UserRepository) {}

  execute(
    id: string,
    updatedUser: { name: string; lastname?: string; email: string }
  ): Promise<User> {
    return this.userRepository.updateAccount(id, updatedUser);
  }
}
