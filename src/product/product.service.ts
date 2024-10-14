import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly categoryService: CategoryService,
    ) {}

    async getAll(): Promise<Product[]> {
        const products = await this.productRepository.find();

        if (!products || products.length === 0) {
            throw new NotFoundException('Not found product');
        }

        return products;
    }

    async createProduct(createProduct: CreateProductDto): Promise<Product> {
        await this.categoryService.getCategoryById(createProduct.categoryId);

        return this.productRepository.save({
            ...createProduct,
        })
    }
}
