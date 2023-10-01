import { IPizzaProps, Pizza } from "../../domain/enterprise/entities";


export const makePizza = (override: Partial<IPizzaProps> = {}): Pizza => {
    const pizza =  Pizza.create({
        imageUrl: "imageUrl",
        name: "Pizza",
        type: 'TRADITIONAL',
        description: "Any description",
        ...override
    })

    return pizza
}