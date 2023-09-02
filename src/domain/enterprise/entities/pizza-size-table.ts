import { randomUUID } from "node:crypto"
import { Entity } from "../../../core/entities/entity"
import { Optional } from "../../../core/types/optional"

export interface IPizzaSizeTableProps {
  id: string
  size: string
  price: string
  createdAt: Date
  updatedAt?: Date
}

export class PizzaSizeTable extends Entity<IPizzaSizeTableProps> {

  get id() {
    return this.props.id
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

  touch() {
    this.props.updatedAt = new Date()
  }

  changeSize(size: string) {
    this.props.size = size.toLowerCase()
    this.touch()
  }

  changePrice(price: string) {
    this.props.price = price
  }


  static create(props: Optional<IPizzaSizeTableProps, "createdAt" | "id">) {
    const pizzaSizeTable = new PizzaSizeTable({
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    })

    return pizzaSizeTable
  }

}