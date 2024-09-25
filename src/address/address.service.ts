import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';

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

}
