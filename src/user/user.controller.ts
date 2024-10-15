import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ReturnUserDto } from './dto/return-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getAllUser(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUser()).map(
      (user) => new ReturnUserDto(user),
    );
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(await this.userService.getUserbyIdUsingRelations(userId));
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async updatePasswordUser(
    @Body() updatePasswordDto: UpdatePasswordDto, 
    @UserId() userId: number,
  ): Promise<User> {
      return this.userService.updatePasswordUser(updatePasswordDto, userId)
    }
 
}
