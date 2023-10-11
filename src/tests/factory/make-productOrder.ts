import { ProductOrder  } from "../../domain/enterprise/entities";

export const makeProductOrder = () => {
    const productOrder =  ProductOrder.create({
        id: 'id-fake',
        orderId: 'id-order',
        productId: "id-product",
        quantity: '5',
    })

    return productOrder
}