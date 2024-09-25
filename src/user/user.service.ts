import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { privateDecrypt } from 'crypto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {};

  async create(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const passwordHashed = await hash(createUserDto.password, saltOrRounds);

    return this.userRepository.save({
      ...createUserDto,
      typeUser: 1,
      password: passwordHashed,
    });
  }

  async getUserbyIdUsingRelations(userId: number){
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['addresses'],
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

}
