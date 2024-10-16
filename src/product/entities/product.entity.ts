import { CartProduct } from "src/cart-product/entity/cart-product.entity";
import { Category } from "src/category/entities/category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'product' })
export class Product {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({name: 'category_id', nullable: false})
    categoryId: number;

    @Column({name: 'price', nullable: false})
    price: number;

    @Column({name: 'image', nullable: false})
    image: string;

    @CreateDateColumn({name: 'created_at'})
    createdat: Date;

    @UpdateDateColumn({name: 'updaed_at'})
    updatedAt: Date;

    @OneToMany(() => CartProduct, (cartProduct) => cartProduct.product)
    cartProduct?: CartProduct[];

    @ManyToOne(
        () => Category, 
        (category: Category) => category.products,
    )
    @JoinColumn({name: 'category_id', referencedColumnName: 'id'})
    category?: Category;
}