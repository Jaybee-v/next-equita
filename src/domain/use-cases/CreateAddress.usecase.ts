import { CreateAddressDto } from "../dtos/create-address.dto";
import { Address } from "../entities/Address";
import { AddressRepository } from "../repositories/AddressRepository";

export class CreateAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  execute(address: CreateAddressDto): Promise<Address> {
    return this.addressRepository.save(address);
  }
}
