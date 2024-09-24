import { CreateAddressDto } from "../dtos/create-address.dto";
import { Address } from "../entities/Address";

export interface AddressRepository {
  save(address: CreateAddressDto): Promise<Address>;
}
