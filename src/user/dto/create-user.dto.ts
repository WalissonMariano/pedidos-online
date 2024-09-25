import { IsInt, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  cpf: string;

  @IsInt()
  typeUser: number;

  @IsString()
  phone: string;

  @IsString()
  password: string;
}
