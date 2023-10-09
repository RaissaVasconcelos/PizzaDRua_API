import { Neighborhood } from './../../../enterprise/entities/neighborhood';
import { Either, left, right } from "../../../../core/either";
import { NeighborhoodRepository } from "../../repositories/neighborhood-repository";
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';


type FindByIdNeighborhoodResponse = Either<ResourceNotFoundError, { neighborhood: Neighborhood }>

export class FindByIdNeighborhood {
  constructor(
    private neighborhoodRepository: NeighborhoodRepository,
  ) { }

  async execute(id: string): Promise<FindByIdNeighborhoodResponse> {
    const neighborhood = await this.neighborhoodRepository.findById(id)

    if(!neighborhood) {
      left(new ResourceNotFoundError())
    }

    return right({ neighborhood })
  }
}