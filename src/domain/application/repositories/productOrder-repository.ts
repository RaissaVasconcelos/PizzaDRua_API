import { ProductOrder } from "../../enterprise/entities";

export interface ProductOrderRepository {
  create: (product: ProductOrder) => Promise<void>
  findProductByOrder: (order: string) => Promise<ProductOrder[] | null>
  findMany: () => Promise<ProductOrder[]>
}

