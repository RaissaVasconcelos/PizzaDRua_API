import { randomUUID } from "node:crypto"
import { Entity } from "../../../core/entities/entity"
import { Optional } from "../../../core/types/optional"

export interface IProductProps {
    id: string
    imageUrl: string    
    name: string
    description: string
    createdAt: Date
    updatedAt?: Date
}

export class Product extends Entity<IProductProps> {
    get id(){
        return this.props.id
    }

    get imageUrl(){
        return this.props.imageUrl
    }

    get name(){
        return this.props.name
    }

    get description(){
        return this.props.description
    }

    get createAt(){
        return this.props.createdAt
    }

    get updatedAt(){
        return this.props.updatedAt
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    changeImageUrl(imageUrl: string) {
        this.props.imageUrl = imageUrl
        this.touch()
    }


    changeName(name: string) {
        this.props.name = name
        this.touch()
    }

    changeDescription(description: string) {
        this.props.description = description
        this.touch()
    }

    static create(props: Optional<IProductProps, "createdAt"| "id">) {
        const product = new Product({
            ...props,
            id: props.id ?? randomUUID(),
            createdAt: props.createdAt ?? new Date(),
        })

        return product
    }

}