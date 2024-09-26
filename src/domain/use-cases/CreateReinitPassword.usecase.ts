import { CreateReinitPasswordDto } from "../dtos/create-reinit-password.dto";
import { ReinitPassword } from "../entities/ReinitPassword";
import { ReinitPasswordRepository } from "../repositories/ReinitPassword";

export class CreateReinitPasswordUseCase {
  constructor(private reinitPasswordRepository: ReinitPasswordRepository) {}

  execute(reinitpassword: CreateReinitPasswordDto): Promise<ReinitPassword> {
    return this.reinitPasswordRepository.save({
      email: reinitpassword.email,
    });
  }
}
