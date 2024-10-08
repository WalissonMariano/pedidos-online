import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async getAllCategories(): Promise<Category[]> {
        const categories = await this.categoryRepository.find();

        if (!categories || categories.length === 0) {
            throw new NotFoundException(`categories empty`);
        }

        return categories;
    }
}
