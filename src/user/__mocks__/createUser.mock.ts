import { CreateUserDto } from "../dto/create-user.dto";
import { UserType } from "../enum/user-type.enum";

export const createUserMock: CreateUserDto = {
    cpf: '11111111111',
    email: 'emailmock@gmail.com',
    name: 'namemock',
    password: 'largerPassword',
    phone: '31999999999',
    typeUser: UserType.User,
}