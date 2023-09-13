import { IOrderProps, Order } from '../../domain/enterprise/entities/order'


export const makeOrder = async (override: Partial<IOrderProps> = {}) => {
  const order = Order.create({
    idCustomer: 'ANY12',
    idPizza: 'ANY32',
    idSize: 'ANY98',
    quantityPizza: '2',
    idDrink: 'ANY767',
    quantityDrink: '2',
    totalPrice: '20,0',
    status: 'completed',
    ...override,
  })

  return order
}