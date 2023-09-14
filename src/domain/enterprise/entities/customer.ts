import { randomUUID } from "crypto"
import { Entity } from "../../../core/entities/entity"
import { Optional } from "../../../core/types/optional"

export interface ICustomersProps {
  id: string
  username: string
  email: string
  phone: string
  password?: string
  createdAt: Date
  updatedAt?: Date
}

export class Customer extends Entity<ICustomersProps> {

  get Id(){
    return this.props.id
  }

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

  static create(props: Optional<ICustomersProps, "createdAt"| "id">) {
    const customer = new Customer({
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    })

    return customer
  }
}
