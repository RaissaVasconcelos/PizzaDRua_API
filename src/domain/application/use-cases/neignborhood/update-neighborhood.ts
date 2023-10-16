import { Either, left, right } from "../../../../core/either";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { Neighborhood } from "../../../enterprise/entities/neighborhood";
import { NeighborhoodRepository } from "../../repositories/neighborhood-repository";


interface UpdateNeighborhoodUseCaseRequest {
  id: string
  name: string
  tax:string
}

type UpdateNeighborhoodResponse = Either<ResourceNotFoundError, {}>

export class UpdateNeighborhood {
  constructor(
    private neighborhoodRepository: NeighborhoodRepository,
  ) { }

  async execute({ id, name, tax }: UpdateNeighborhoodUseCaseRequest): Promise<UpdateNeighborhoodResponse> {
    const updated = await this.neighborhoodRepository.findById(id)

    if(!updated) {
      return left(new ResourceNotFoundError())
    }

    const newNeighborhood = Neighborhood.create({ id, name, tax })

    await this.neighborhoodRepository.update(newNeighborhood)

    return right({})
  }
}