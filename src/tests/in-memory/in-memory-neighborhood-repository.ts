import { NeighborhoodRepository } from "../../domain/application/repositories/neighborhood-repository";
import { Neighborhood } from "../../domain/enterprise/entities/neighborhood";


export class InMemoryNeighborhoodRepository implements NeighborhoodRepository {
  public neighborhood: Neighborhood[] = []

  async create(neighborhood: Neighborhood): Promise<void> {
    this.neighborhood.push(neighborhood)
  }


  async findByName(name: string): Promise<Neighborhood | null> {
    const neighborhood = this.neighborhood.find(add => add.name === name)

    if (!neighborhood) {
      return null
    }

    return neighborhood
  }

  async findMany(): Promise<Neighborhood[]> {
    return this.neighborhood
  }


}