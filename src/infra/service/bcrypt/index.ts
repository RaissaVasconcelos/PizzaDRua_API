import bcrypt from 'bcryptjs';
import { BcryptService } from '../../../domain/application/service/bcrypt/bcript-service';


export class BcryptServiceImpl implements BcryptService {
  async hashPassword(password: string, saltRounds: number): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    const compare = await bcrypt.compare(password, hashedPassword)
    return compare
  }
}