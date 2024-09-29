import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

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

}
