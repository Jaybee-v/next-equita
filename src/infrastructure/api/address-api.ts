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

  async update(id: string, address: CreateAddressDto): Promise<Address> {
    const updatedAddress = await fetch(`/api/address/update/${id}`, {
      method: "PATCH",
      body: JSON.stringify(address),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await updatedAddress.json();

    if (updatedAddress.status === 200) {
      return data;
    }
    throw new Error(data.error);
  },

  async deleteAddress(id: string): Promise<void> {
    const deletedAddress = await fetch(`/api/address/delete/${id}`, {
      method: "DELETE",
    });
    const data = await deletedAddress.json();

    if (deletedAddress.status === 200) {
      return data;
    }
    throw new Error(data.error);
  },
};
