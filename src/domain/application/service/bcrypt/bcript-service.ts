export interface BcryptService {
  hashPassword(password: string, saltRounds: number): Promise<void>
  comparePassword(password: string, hashPassword: number): Promise<void>
}