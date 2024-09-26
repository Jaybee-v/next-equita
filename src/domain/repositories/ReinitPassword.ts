import { CreateReinitPasswordDto } from "../dtos/create-reinit-password.dto";
import { ReinitPassword } from "../entities/ReinitPassword";

export interface ReinitPasswordRepository {
  save(reinitPassword: CreateReinitPasswordDto): Promise<ReinitPassword>;
}
