// import { UniqueEntityId } from "./unique-entity-id"

export class Entity <Props> {
  // private _id: UniqueEntityId
  protected props: Props

  constructor(props: Props) {
    this.props = props 
  }

  // get id() {
  //   return this._id 
  // }
}
