import { IPizzaProps, Pizza } from "../../domain/enterprise/entities";


export const makePizza = async (override: Partial<IPizzaProps> = {}): Promise<Pizza> => {
    const pizza =  Pizza.create({
        imageUrl: "imageUrl",
        name: "Pizza",
        type: 'TRADITIONAL',
        description: "Any description",
        ...override
    })

    return pizza
}