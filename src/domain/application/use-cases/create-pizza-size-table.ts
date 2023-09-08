import { Either, right } from "../../../core/either";
import { PizzaSizeTable } from "../../enterprise/entities/pizza-size-table";
import { PizzaSizeTableRepository } from "../repositories/pizza-size-table-repository";

interface PizzaSizeTableRequest {
  size: string;
  price: string;
}

type PizzaSizeTableResponse = Either<null, {}>

export class CreatePizzaSizeTableUseCase {
  constructor(private pizzaSizeTableRepository: PizzaSizeTableRepository) { }

  async execute({ price, size }: PizzaSizeTableRequest): Promise<PizzaSizeTableResponse> {
    const pizzaSizeTable = PizzaSizeTable.create({ price, size });

    await this.pizzaSizeTableRepository.create(pizzaSizeTable);
    return right({})
  }
}