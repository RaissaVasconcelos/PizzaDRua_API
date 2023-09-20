import { Address, IAddressProps } from "../../domain/enterprise/entities";

export function makeAddress(override: Partial<IAddressProps> = {}) {
  const address = Address.create({
    customerId: 'customerId',
    type: 'HOME',
    street: 'street',
    number: '23',
    neighborhood: 'neighborhood',
    zipCode: 'zipCode',
    phone: 'phone',
    ...override,
  })

  return address
}