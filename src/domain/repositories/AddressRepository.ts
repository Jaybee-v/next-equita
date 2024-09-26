import { CreateAddressDto } from "../dtos/create-address.dto";
import { UpdateAddressDto } from "../dtos/update-address.dto";
import { Address } from "../entities/Address";

export interface AddressRepository {
  save(address: CreateAddressDto): Promise<Address>;
  update(id: string, address: UpdateAddressDto): Promise<Address>;
  deleteAddress(id: string): Promise<void>;
}
