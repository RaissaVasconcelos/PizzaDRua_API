import { randomUUID } from "crypto"
import { Entity } from "../../../core/entities/entity"
import { Optional } from "../../../core/types/optional"

export interface IOrderProps {
  id: string
  idCustomer: string
  idPizza: string
  idSize: string
  quantityPizza: string
  idDrink: string
  quantityDrink: string
  totalPrice: string
  status: string
  createdAt: Date
  updatedAt?: Date 
}

export class Order extends Entity<IOrderProps> {
  get id() {
    return this.props.id
  }

  get idCustomer() {
    return this.props.idCustomer
  }

  get idPizza() {
    return this.props.idPizza
  }

  get idSize() {
    return this.props.idSize
  }

  get quantityPizza() {
    return this.props.quantityPizza
  }

  get idDrink() {
    return this.props.idDrink
  }

  get quantityDrink() {
    return this.props.quantityDrink
  }

  get totalPrice() {
    return this.props.totalPrice
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get status() {
    return this.props.status
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  changeQuantityPizza(quantity: string) {
    this.props.quantityPizza = quantity
    this.touch()
  }

  changeQuantityDrink(quantity: string) {
    this.props.quantityDrink = quantity
    this.touch()
  }

  changeTotalPrice(totalPrice: string) {
    this.props.totalPrice = totalPrice
    this.touch()
  }

  changeStatus(status: string) {
    this.props.status = status
    this.touch()
  }

  static create(props: Optional<IOrderProps, "createdAt" | "id">) {
    const order = new Order({
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date()
    })

    return order
  } 
}