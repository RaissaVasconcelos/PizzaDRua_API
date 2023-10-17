import { prisma } from '../../lib/prisma'

export const categorySeeders = async () => {
    await prisma.category.createMany({
        data: [
            { name: 'pizzas' },
            { name: 'bebidas' }
        ]
    })
}