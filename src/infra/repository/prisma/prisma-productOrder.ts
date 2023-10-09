import { prisma } from "../../../lib/prisma";
import { ProductRepository } from "../../../domain/application/repositories/product-repository";
import { Product } from "../../../domain/enterprise/entities";
import { IProductList } from "../../../interfaces/IProduct-list";

export class PrismaProductRepository implements ProductRepository {
  async create({ name, categoryId, price, size, type, description, image }: Product): Promise<void> {    
    await prisma.product.create({
      data: { 
        name,
        categoryId,
        description,
        image,
        price,
        size,
        type,
      }
    })
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id }
    })

    if(!product) return null

    return new Product(product)
  }

  async findByName(name: string): Promise<Product | null> {
    const productExist = await prisma.product.findFirst({
      where: { name }
    })

    if(!productExist) return null

    return new Product(productExist)
  }

  async findMany(): Promise<IProductList[]> {
    const product = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        category: {
          select: {
            id: true,
            name: true,
          }
        },
        categoryId: true,
        description: true,
        image: true,
        price: true,
        size: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      }
    })

    return product
  }

  async update({ id, categoryId, name, price, type, size, description, image }: Product): Promise<void> {
    await prisma.product.update({
      where: { id },
      data: {
        name,
        categoryId,
        price,
        type,
        size,
        description,
        image,
        updatedAt: new Date()
      }
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } })
  }
}