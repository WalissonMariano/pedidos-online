import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { ReturnProduct } from './dto/return-product.dto';
import { ProductService } from './product.service';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {} 


    @Get()
    async getAll(): Promise<ReturnProduct[]> {
        return (await this.productService.getAll()).map(
            (product) => new ReturnProduct(product),
        );
    }
}
