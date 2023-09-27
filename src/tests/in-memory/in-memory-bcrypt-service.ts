import { BcryptService } from "../../domain/application/service/bcrypt/bcript-service";

export class InMemoryBcryptService implements BcryptService {
  public passwordHash = 'hsahdrowssap12340987'
  public passwordErro = 'passwordInvalid'
  
  async hashPassword(password: string, saltRounds: number): Promise<string> {
    return this.passwordHash
  }

  async comparePassword(password: string, hashPassword: string): Promise<boolean> {
    if (password === hashPassword) return true
    return false
  }
}