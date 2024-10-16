import { Cart } from "src/cart/entities/cart.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: 'cart-product' })
export class CartProduct {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'cart_id', nullable: false })
    cartId: string;

    @Column({ name: 'product_id', nullable: false})
    productId: number;

    @Column({ name: 'amount', nullable: false})
    amount: number;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at'})
    updateAt: Date;

    @ManyToOne(
        () => Product, 
        (product: Product) => product.cartProduct,
    )
    @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
    product?: Product;

    @ManyToOne(
        () => Cart, 
        (cart: Cart) => cart.cartProduct,
    )
    @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
    cart?: Cart;
}