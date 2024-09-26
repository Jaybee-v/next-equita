import { CreateReinitPasswordDto } from "@/domain/dtos/create-reinit-password.dto";
import { ReinitPassword } from "@/domain/entities/ReinitPassword";
import { ReinitPasswordRepository } from "@/domain/repositories/ReinitPassword";
import { reinitPasswordApi } from "../api/reinit-password-api";

export class ReinitPasswordRepositoryImpl implements ReinitPasswordRepository {
  async save(reinitPassword: CreateReinitPasswordDto): Promise<ReinitPassword> {
    return reinitPasswordApi.save(reinitPassword);
  }
}
