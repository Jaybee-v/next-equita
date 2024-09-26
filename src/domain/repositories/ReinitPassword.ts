import { CreateReinitPasswordDto } from "../dtos/create-reinit-password.dto";
import { ReinitPassword } from "../entities/ReinitPassword";
import { User } from "../entities/User";

export interface ReinitPasswordRepository {
  save(reinitPassword: CreateReinitPasswordDto): Promise<ReinitPassword>;
  getById(id: string): Promise<User>;
}
