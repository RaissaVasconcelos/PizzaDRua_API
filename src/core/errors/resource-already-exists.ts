import { UseCaseError } from "./use-case-error";

export class ResourceAlreadyExists extends Error implements UseCaseError {
    constructor() {
        super('Resource already exists')
    }
}