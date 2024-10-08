import { stateMock } from "../../state/__mocks__/state.mock";
import { City } from "../entities/city.entity";

export const cityMock: City = {
    createdAt: new Date(),
    id: 654232,
    name: 'cityName',
    stateId: stateMock.id,
    updatedAt: new Date(),
}