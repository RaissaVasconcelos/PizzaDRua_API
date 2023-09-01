import { Entity } from "../../../core/entities/entity"
import { UniqueEntityId } from "../../../core/entities/unique-entity-id"
import { Optional } from "../../../core/types/optional"

export interface ICustomersProps {
  username: string
  email: string
  phone: string
  password?: string
  createdAt: Date
  updatedAt?: Date
}

export class Customer extends Entity<ICustomersProps> {
  get Username(){
    return this.props.username
  }

  get Email(){
    return this.props.email
  }

  get Phone(){
    return this.props.phone
  }

  get Password(){
    return this.props.password
  }

  get CreateAt(){
    return this.props.createdAt
  }

  get UpdatedAt(){
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  changeUsername(userName: string) {
    this.props.username = userName
    this.touch()
  }

  changeEmail(email: string) {
    this.props.email = email
    this.touch()
  }

  changePhone(phone: string) {
    this.props.phone = phone
    this.touch()
  }

  changePassword(password: string) {
    this.props.password = password
    this.touch()
  }

  static create(props: Optional<ICustomersProps, "createdAt">, id?:UniqueEntityId) {
    const customer = new Customer({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }, id)

    return customer
  }
}
