import { Entity } from "../../../core/entities/entity"

export interface IOrderProps {
  id: string
  idClient: string
  idPizza: string
  idSize: string
  quantityPizza: string
  idDrink: string
  quantityDrink: string
  totalPrice: string
  dateTime: string
  status: string 
}

export class Order extends Entity<IOrderProps> {
  get id() {
    return this.props.id
  }

  get idClient() {
    return this.props.idClient
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

  get dateTime() {
    return this.props.dateTime
  }

  get status() {
    return this.props.status
  }
}