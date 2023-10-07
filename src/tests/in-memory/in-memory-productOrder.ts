import { ProductOrderRepository } from "../../domain/application/repositories/productOrder-repository";
import { ProductOrder } from "../../domain/enterprise/entities";

export class InMemoryProductOrderRepository implements ProductOrderRepository {
    public productsOrders: ProductOrder[] = []

    async create(productOrder: ProductOrder): Promise<void> {
      this.productsOrders.push(productOrder)
    }

    async findMany(): Promise<ProductOrder[]> {
      return this.productsOrders
    }

    async findProduct(order: string): Promise<ProductOrder[] | null> {
      const arrOder = this.productsOrders.filter(product => product.orderId === order)
      return arrOder
    }
}