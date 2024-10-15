import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ReturnLoginDto } from './dto/return-login.dto';
import { ReturnUserDto } from '../user/dto/return-user.dto';
import { LoginPayload } from './dto/loginPayload.dto';
import { JwtService } from '@nestjs/jwt';
import { validatePassword } from 'src/utils/password';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) {};

    async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
        const user: User | undefined = await this.userService.getUserByEmail(loginDto.email).catch(() => undefined);

        const isMatch = await validatePassword(
            loginDto.password, 
            user?.password || ''
        );

        if (!user || !isMatch) {
            throw new NotFoundException('Email or password invalid')
        }

        return {
            accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
            user: new ReturnUserDto(user)
        };
    }

}
