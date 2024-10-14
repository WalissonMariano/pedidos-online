import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { ReturnProduct } from './dto/return-product.dto';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

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

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async createProduct(@Body() createProduct: CreateProductDto): Promise<Product> {
        return this.productService.createProduct(createProduct);
    }
}
