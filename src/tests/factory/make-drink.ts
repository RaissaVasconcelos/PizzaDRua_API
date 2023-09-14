import { Drink, IDrinkProps } from "../../domain/enterprise/entities/drink";

export function makeDrink(override: Partial<IDrinkProps> = {}) {
  const drink = Drink.create({
    name: 'Coca-cola',
    size: '600ml',
    price: '6.0',
    ...override,
  })

  return drink
}