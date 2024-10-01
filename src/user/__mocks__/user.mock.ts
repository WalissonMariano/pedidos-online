import { User } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";

export const userEntityMock: User = {
    cpf: '11111111111',
    createdAt: new Date(),
    email: 'emailmock@gmail.com',
    id: 43242,
    name: 'namemock',
    password: 'largerPassword',
    phone: '31999999999',
    typeUser: UserType.User,
    updatedAt: new Date(),
}