import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserType } from './enum/user-type.enum';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { createPasswordHashed, validatePassword } from 'src/utils/password';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {};

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.getUserByEmail(createUserDto.email).catch(() => undefined);

    if(user) {
      throw new BadGatewayException('email registered in system');
    }

    const passwordHashed = await createPasswordHashed(
      createUserDto.password,
    );

    return this.userRepository.save({
      ...createUserDto,
      typeUser: UserType.User,
      password: passwordHashed,
    });
  }

  async getUserbyIdUsingRelations(userId: number){
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    })
  }

  async getAllUser() {
    return this.userRepository.find();
  }

  async getUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      },
    });

    if(!user) {
      throw new NotFoundException(`UserId:${userId} Not Found`);
    }

    return user;

  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if(!user) {
      throw new NotFoundException(`UserId:${email} Not Found`);
    }

    return user;

  }

  async updatePasswordUser(
    updatePasswordDto: UpdatePasswordDto,
    userId: number,
  ): Promise<User> {
    const user = await this.getUserById(userId);

    const passwordHashed = await createPasswordHashed(
      updatePasswordDto.newPassword,
    );

    const isMatch = await validatePassword(
      updatePasswordDto.lastPassword, 
      user.password || '',
    );

    if (!isMatch) {
      throw new BadRequestException('Last password invalid')
    }

    return this.userRepository.save({
      ...user,
      password: passwordHashed,
    })
    
  }

}
