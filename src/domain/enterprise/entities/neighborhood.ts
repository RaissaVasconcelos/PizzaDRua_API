import { randomUUID } from "crypto"
import { Entity } from "../../../core/entities/entity"
import { Optional } from "../../../core/types/optional"


export interface INeighborhoodProps {
  id: string
  name: string
  tax: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Neighborhood extends Entity<INeighborhoodProps> {

  get id() {
    return this.props.id
  }

  get name () {
    return this.props.name
  } 

  get tax () {
    return this.props.tax
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }


  changeName(name: string) {
    this.props.name = name
    this.touch()
  }  

  changeTax(tax: string) {
    this.props.tax = tax
    this.touch()
  }


  static create(props: Optional<INeighborhoodProps, "createdAt" | "id">) {
    const neighborhood = new Neighborhood({
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    })

    return neighborhood
  }
}