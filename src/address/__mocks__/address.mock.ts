import { cityMock } from "src/city/__mocks__/city.mock";
import { Address } from "../entities/address.entity";
import { userEntityMock } from "src/user/__mocks__/user.mock";

export const addressMock: Address = {
    cep: '43253252',
    cityId: cityMock.id,
    complement: 'frefrefer',
    createdAt: new Date(),
    id: 57546,
    numberAddress: 654,
    updatedAt: new Date(),
    userId: userEntityMock.id,
}