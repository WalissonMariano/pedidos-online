import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoryService } from 'src/category/category.service';
import { UpdateProductDto } from './dto/update-product.dto';

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

    async getProductById(productId: number): Promise<Product> {
        const product = await this.productRepository.findOne({
            where: {
                id: productId,
            },
        });

        if (!product) {
            throw new NotFoundException(`Product id: ${productId} not found`);
        }

        return product;
    }

    async createProduct(createProduct: CreateProductDto): Promise<Product> {
        await this.categoryService.getCategoryById(createProduct.categoryId);

        return this.productRepository.save({
            ...createProduct,
        })
    }

    async deleteProduct(productId: number): Promise<DeleteResult> {
        await this.getProductById(productId);
  
        return this.productRepository.delete({ id: productId });
    }

    async updateProduct(
        updateProduct: UpdateProductDto,
        productId: number,
    ): Promise<Product> {
        const product = await this.getProductById(productId);

        return this.productRepository.save({
            ...product,
            ...updateProduct,
        })
    }
}
