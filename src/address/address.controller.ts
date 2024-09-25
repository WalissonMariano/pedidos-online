import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';

@Controller('address')
export class AddressController {
    constructor(
        private readonly addressService: AddressService,
    ) {};

    @Post('/:userId')
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body() createAddressDto: CreateAddressDto,
        @Param('userId') userId: number,
    ): Promise<Address> {
        return this.addressService.createAddress(createAddressDto, userId);
    }
}
