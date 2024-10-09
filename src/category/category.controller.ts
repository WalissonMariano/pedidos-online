import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReturnCategoryDto } from './dtos/return-category.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './entities/category.entity';

@Roles(UserType.Admin, UserType.User)
@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) {}

    @Get()
    async getAllCategories(): Promise<ReturnCategoryDto[]> {
        return (await this.categoryService.getAllCategories()).map(
            (category) => new ReturnCategoryDto(category),
        );
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async createCategory(
        @Body() createCategory: CreateCategoryDto,
    ): Promise<Category> {
        return this.categoryService.createCategory(createCategory);
    }
}
