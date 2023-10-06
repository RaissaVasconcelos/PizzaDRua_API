import { Neighborhood } from './../../enterprise/entities/neighborhood';


export interface NeighborhoodRepository {
    create(neighborhood: Neighborhood): Promise<void>
    findMany(): Promise<Neighborhood[]>
    findByName(name: string): Promise<Neighborhood | null>
   
}