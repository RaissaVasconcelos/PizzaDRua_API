import { randomUUID } from "node:crypto"
import { Entity } from "../../../core/entities/entity"
import { Optional } from "../../../core/types/optional"


export interface IPizzaProps {
    id: string
    imageUrl: string    
    name: string
    type: "TRADITIONAL" | "SPECIAL"
    description: string
    createdAt: Date
    updatedAt?: Date
}

export class Pizza extends Entity<IPizzaProps> {
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

    get type(){
        return this.props.type
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

    static create(props: Optional<IPizzaProps, "createdAt"| "id">) {
        const pizza = new Pizza({
            ...props,
            id: props.id ?? randomUUID(),
            createdAt: props.createdAt ?? new Date(),
        })

        return pizza
    }

}