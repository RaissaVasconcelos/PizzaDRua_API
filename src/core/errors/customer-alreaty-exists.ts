export class CustomerAlreadyExistsError extends Error {
    constructor() {
        super('Customer Already Exists')
    }
}
