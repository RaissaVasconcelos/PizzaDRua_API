import { IProductProps, Product } from "../../domain/enterprise/entities/product";


export const makeProduct = async (override: Partial<IProductProps> = {}): Promise<Product> => {
    const product =  Product.create({
        imageUrl: "imageUrl",
        name: "Pizza",
        description: "Any description",
        ...override
    })

    return product
}