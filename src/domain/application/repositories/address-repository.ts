import { Address } from "../../enterprise/entities/address"

export interface AddressRepository {
    create(address: Address): Promise<void>
    findById(id: string): Promise<Address | null>
    findMany(): Promise<Address[]>
    update(address: Address): Promise<void>
}