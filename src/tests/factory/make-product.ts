import { Product, IProductProps  } from "../../domain/enterprise/entities";


export const makeProduct = (override: Partial<IProductProps> = {}): Product => {
    const product =  Product.create({
        name: "Pizza",
        idCategory: '1',
        price: "23,00",
        size: "Grande",
        type: 'TRADITIONAL',
        imageUrl: "imageUrl",
        description: "Any description",
        ...override
    })

    return product
}