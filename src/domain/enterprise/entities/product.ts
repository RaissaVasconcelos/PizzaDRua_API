import { randomUUID } from "node:crypto"
import { Entity } from "../../../core/entities/entity"
import { Optional } from "../../../core/types/optional"

export interface IProductProps {
    id: string
    categoryId: string
    name: string
    type?: "TRADITIONAL" | "SPECIAL" | null
    image?: string | null 
    size: string
    description: string
    price: string
    createdAt: Date
    updatedAt?: Date | null
}

export class Product extends Entity<IProductProps> {
    get id(){
        return this.props.id
    }

    get categoryId(){
        return this.props.categoryId
    }

    get name(){
        return this.props.name
    }

    get image(){
        return this.props.image
    }

    get description(){
        return this.props.description
    }

    get type(){
        return this.props.type
    }

    get size(){
        return this.props.size
    }

    get price(){
        return this.props.price
    }

    get createdAt(){
        return this.props.createdAt
    }

    get updatedAt(){
        return this.props.updatedAt
    }

    private touch() {
        this.props.updatedAt = new Date()
    }

    changeName(name: string) {
        this.props.name = name
        this.touch()
    }

    changeImageUrl(image: string) {
        this.props.image = image
        this.touch()
    }

    changeDescription(description: string) {
        this.props.description = description
        this.touch()
    }

    changeSize(size: string) {
        this.props.size = size
        this.touch()
    }

    changeType(type: "TRADITIONAL" | "SPECIAL") {
        this.props.type = type
        this.touch()
    }

    changePrice(price: string) {
        this.props.price = price
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