import { UpdateAddressDto } from "../dtos/update-address.dto";
import { Address } from "../entities/Address";
import { AddressRepository } from "../repositories/AddressRepository";

export class UpdateAddressUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(id: string, address: UpdateAddressDto): Promise<Address> {
    return this.addressRepository.update(id, address);
  }
}
