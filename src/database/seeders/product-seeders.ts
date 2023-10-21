import { prisma } from '../../lib/prisma'

export const productSeeders = async () => {

    const categoryPizzas = await prisma.category.findFirst({
        where: { name: 'pizza' }
    })

    const categoryBebidas = await prisma.category.findFirst({
        where: { name: 'drink' }
    })
    
    await prisma.product.createMany({
        data: [
            {
              name: 'Calabresa',
              categoryId: categoryPizzas!.id,
              description: 'Molho, Mussarela, Tomate, Oregáno',
              imageUrl: 'imagem pizza',
              price: '49.99',
              type: 'TRADITIONAL',
            },
            {
              name: 'Portuguesa',
              categoryId: categoryPizzas!.id,
              description: 'Molho, Mussarela, Tomate, Oregáno',
              imageUrl: 'imagem pizza',
              price: '49.99',
              type: 'TRADITIONAL',
            },
            {
              name: 'Penosa',
              categoryId: categoryPizzas!.id,
              description: 'Molho, Mussarela, Tomate, Oregáno',
              imageUrl: 'imagem pizza',
              price: '59.99',
              type: 'SPECIAL',
            },
            {
              name: '5 queijos',
              categoryId: categoryPizzas!.id,
              description: 'Molho, Mussarela, Tomate, Oregáno',
              imageUrl: 'imagem pizza',
              price: '59.99',
              type: 'SPECIAL',
            },
            {
              name: 'Coca-cola 2l',
              categoryId: categoryBebidas!.id,
              description: 'Bebida gelada',
              imageUrl: 'imagem pizza',
              price: '10.00',
            },
            {
              name: 'Guaraná 200ml',
              categoryId: categoryBebidas!.id,
              description: 'Bebida gelada',
              imageUrl: 'imagem pizza',
              price: '6.00',
            },
          ]
      })

}