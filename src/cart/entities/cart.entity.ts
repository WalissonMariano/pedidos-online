import { CartProduct } from "src/cart-product/entity/cart-product.entity";
import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";

@Entity({ name: 'cart' })
export class Cart {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'user_id', nullable: false })
    name: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt: Date;

    @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart)
    cartProduct?: CartProduct[]; 
}