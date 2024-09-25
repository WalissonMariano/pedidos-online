import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService
    ) {};

    async login(loginDto: LoginDto): Promise<User> {
        const user: User | undefined = await this.userService.getUserByEmail(loginDto.email).catch(() => undefined);

        const isMatch = await bcrypt.compare(loginDto.password, user?.password || '');

        if (!user || !isMatch) {
            throw new NotFoundException('Email or password invalid')
        }

        return user;
    }

}
