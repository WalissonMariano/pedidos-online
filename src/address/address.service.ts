import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,
        private readonly userService: UserService,
        private readonly cityService: CityService
    ) {};

    async createAddress(
        createAddressDto: CreateAddressDto, 
        userId: number
    ): Promise<Address> {
        await this.userService.getUserById(userId);
        await this.cityService.getCityById(createAddressDto.cityId);

        return this.addressRepository.save({
            ...createAddressDto,
            userId,
        });
    }

    async getAddressByUserId(userId: number): Promise<Address[]> {
        const addresses = await this.addressRepository.find({
            where: {
                userId,
            },
            relations: {
                city: {
                    state: true,
                }
            }
        });

        if (!addresses || addresses.length === 0) {
           throw new NotFoundException(`Address not found for userId: ${userId}`);
        }

        return addresses;
    }

}
