import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/create-category.dto';

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

    async getCategoryByName(name: string): Promise<Category> {
        const category = await this.categoryRepository.findOne({
            where: {
                name,
            }
        });

        if (!category) {
            throw new NotFoundException(`Category name ${name} not found`);
        }

        return category;
    }

    async createCategory(
        createCategory: CreateCategoryDto,
    ): Promise<Category> {
        const category = await this.getCategoryByName(createCategory.name).catch(
            () => undefined,
        );

        if(category) {
            throw new BadRequestException(
                `Category name ${createCategory.name} exist`,
            );
        }

        return this.categoryRepository.save(createCategory);
    }

}
