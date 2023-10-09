import { randomUUID } from "node:crypto"
import { Entity } from "../../../core/entities/entity"
import { Optional } from "../../../core/types/optional"

export interface IProductOrderProps {
    id: string
    orderId: string
    productId: string
    quantity: string
}

export class ProductOrder extends Entity<IProductOrderProps> {
    get id(){
        return this.props.id
    }

    get orderId(){
        return this.props.orderId
    }

    get productId(){
        return this.props.productId
    }

    get quantity(){
        return this.props.quantity
    }

    static create(props: Optional<IProductOrderProps, "id">) {
        const productOrder = new ProductOrder({
            ...props,
            id: props.id ?? randomUUID(),
        })

        return productOrder
    }

}