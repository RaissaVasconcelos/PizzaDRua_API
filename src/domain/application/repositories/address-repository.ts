import { Address } from "../../enterprise/entities/address"

export interface AddressRepository {
    create(address: Address): Promise<Address>
    findById(id: string): Promise<Address | null>
    find(client: string): Promise<Address[]>
    findMany(customerId: string): Promise<Address[]>
    update(address: Address): Promise<void>
    delete(id: string): Promise<void>
}