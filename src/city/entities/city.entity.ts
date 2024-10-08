import { Address } from "../../address/entities/address.entity";
import { State } from "../../state/entities/state.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'city'})
export class City {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({name: 'state_id', nullable: false})
  stateId: number;

  @Column({name: 'name', nullable: false})
  name: string;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
 
  @OneToMany(() => Address, (address) => address.city)
  addresses?: Address[];

  @ManyToOne(() => State, (state) => state.cities)
  @JoinColumn({ name: 'state_id', referencedColumnName: 'id'})
  state?: State;
}
