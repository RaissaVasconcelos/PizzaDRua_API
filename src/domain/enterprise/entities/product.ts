import { randomUUID } from "node:crypto"
import { Entity } from "../../../core/entities/entity"
import { Optional } from "../../../core/types/optional"

export interface IProductProps {
    id: string
    name: string
    description: string
    createdAt: Date
    updatedAt?: Date
}

export class Product extends Entity<IProductProps> {
    get Id(){
        return this.props.id
    }

    get Name(){
        return this.props.name
    }

    get Description(){
        return this.props.description
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

    changeName(name: string) {
        this.props.name = name
        this.touch()
    }

    changeDescription(description: string) {
        this.props.description = description
        this.touch()
    }

    create(props: Optional<IProductProps, "createdAt"| "id">) {
        const product = new Product({
            ...props,
            id: props.id ?? randomUUID(),
            createdAt: props.createdAt ?? new Date(),
        })

        return product
    }

}