import bcrypt from 'bcrypt';
import { BcryptService } from '../../../domain/application/service/bcrypt/bcript-service';


export class BcryptServiceImpl implements BcryptService {
    async hashPassword(password: string, saltRounds: number): Promise<string> {
        console.log('password', password)
        // const passwordhash = bcrypt.hash(password, saltRounds)
        // console.log('password', passwordhash)
        return password
    }
    
    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        const compare = await bcrypt.compare(password, hashedPassword)
        console.log('password', compare)
        return compare
    }
}