import { randomUUID } from "crypto";
import { Entity } from "../../../core/entities/entity";
import { Optional } from "../../../core/types/optional";

export interface IDrinkProps {
  id: string
  name: string
  size: string
  price: string
  createdAt: Date
  updatedAt?: Date
}

export class Drink extends Entity<IDrinkProps> {
  get id() {
    return this.props.id
  }
  
  get name() {
    return this.props.name
  }

  get size() {
    return this.props.size
  }

  get price() {
    return this.props.price
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
  
  changeSize(size: string) {
    this.props.size = size
    this.touch()
  }

  changePrice(price: string) {
    this.props.price = price
    this.touch()
  }
  
  static create(props: Optional<IDrinkProps, "createdAt" | "id">) {
    const drink = new Drink({
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    })

    return drink
  }
}