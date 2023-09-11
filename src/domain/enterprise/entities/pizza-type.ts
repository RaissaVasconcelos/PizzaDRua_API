import { randomUUID } from "crypto"
import { Entity } from "../../../core/entities/entity"
import { Optional } from "../../../core/types/optional"

export interface IPizzaTypeProps {
  id: string
  name: string
  type: 'TRADITIONAL' | 'SPECIAL'
  createdAt: Date
  updatedAt?: Date
}

export class PizzaType extends Entity<IPizzaTypeProps> {

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  get type() {
    return this.props.type
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

  changeType(type: 'TRADITIONAL' | 'SPECIAL') {
    this.props.type = type
    this.touch()
  }

  static create(props: Optional<IPizzaTypeProps, "createdAt" | "id">) {
    const pizzaType = new PizzaType({
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    })

    return pizzaType
  }

}