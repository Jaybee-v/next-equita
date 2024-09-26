import { User } from "../entities/User";
import { ReinitPasswordRepository } from "../repositories/ReinitPassword";

export class GetReinitPasswordByIdUseCase {
  constructor(private reinitPasswordRepository: ReinitPasswordRepository) {}

  execute(id: string): Promise<User> {
    return this.reinitPasswordRepository.getById(id);
  }
}
