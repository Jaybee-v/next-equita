import { CreateAddressDto } from "@/domain/dtos/create-address.dto";
import { Address } from "@/domain/entities/Address";

export const addressApi = {
  async save(address: CreateAddressDto): Promise<Address> {
    const createdAddress = await fetch("/api/address", {
      method: "POST",
      body: JSON.stringify(address),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await createdAddress.json();

    if (createdAddress.status === 201) {
      return data;
    }
    throw new Error(data.error);
  },
};
