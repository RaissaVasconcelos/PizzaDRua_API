import { randomUUID } from "crypto"
import { Entity } from "../../../core/entities/entity"
import { Optional } from "../../../core/types/optional"

export interface IAddressProps {
    id: string
    customerId: string
    street: string
    number: number
    complement?: string
    city: string
    state: string
    zipCode: string
    phone: string
    createdAt: Date
    updatedAt?: Date
}

export class Address extends Entity<IAddressProps> {
    
    get id(){
        return this.props.id
    }

    get customerId(){
        return this.props.customerId
    }

    get street(){
        return this.props.street
    }

    get number(){
        return this.props.number
    }

    get complement(){
        return this.props.complement
    }

    get city(){
        return this.props.city
    }

    get state(){
        return this.props.state
    }

    get zipCode(){
        return this.props.zipCode
    }

    get phone(){
        return this.props.phone
    }

    get createdAt(){
        return this.props.createdAt
    }

    get updatedAt(){
        return this.props.updatedAt
    }

    private touch(){
        this.props.updatedAt = new Date()
    }

    changeStreet(street: string){
        this.props.street = street
        this.touch()
    }

    changeNumber(number: number){
        this.props.number = number
        this.touch()
    }


    changeComplement(complement: string){
        this.props.complement = complement
        this.touch()
    }

    changeCity(city: string){
        this.props.city = city
        this.touch()
    }

    changeState(state: string){
        this.props.state = state
        this.touch()
    }


    changeZipCode(zipCode: string){
        this.props.zipCode = zipCode
        this.touch()
    }

    changePhone(phone: string){
        this.props.phone = phone
        this.touch()
    }

    static create(props: Optional<IAddressProps, "createdAt" | "id">) {
        const address = new Address({
            ...props,
            id: props.id ?? randomUUID(),
            createdAt: props.createdAt ?? new Date(),
        })

        return address
    }
}