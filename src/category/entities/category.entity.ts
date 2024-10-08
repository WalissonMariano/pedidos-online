import { Product } from "src/product/entities/product.entity";
import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";

@Entity({name: 'category'})
export class Category {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @CreateDateColumn({name: 'created_at'})
    createdat: Date;

    @UpdateDateColumn({name: 'updaed_at'})
    updatedAt: Date;

    @OneToMany(() => Product, (product: Product) => product.category)
    products: Product;
}