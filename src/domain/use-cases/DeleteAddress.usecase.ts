import { AddressRepository } from "../repositories/AddressRepository";

export class DeleteAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(id: string): Promise<void> {
    return this.addressRepository.deleteAddress(id);
  }
}
