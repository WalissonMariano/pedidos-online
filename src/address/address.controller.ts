import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';
import { UserType } from '../user/enum/user-type.enum';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';

@Roles(UserType.User)
@Controller('address')
export class AddressController {
    constructor(
        private readonly addressService: AddressService,
    ) {};

    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body() createAddressDto: CreateAddressDto,
        @UserId() userId: number,
    ): Promise<Address> {
        return this.addressService.createAddress(createAddressDto, userId);
    }
}
