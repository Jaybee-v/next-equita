import { CreateAddressDto } from "@/domain/dtos/create-address.dto";
import { Address } from "@/domain/entities/Address";
import { AddressRepository } from "@/domain/repositories/AddressRepository";
import { addressApi } from "../api/address-api";
import { UpdateAddressDto } from "@/domain/dtos/update-address.dto";

export class AddressRepositoryImpl implements AddressRepository {
  async save(address: CreateAddressDto): Promise<Address> {
    return addressApi.save(address);
  }

  async update(id: string, address: UpdateAddressDto): Promise<Address> {
    return addressApi.update(id, address);
  }
}
