import { BaseEntity, Entity, Column, PrimaryColumn, BeforeInsert } from "typeorm";
import * as uuidv4 from 'uuid/v4';

@Entity()
export class User extends BaseEntity {

    @PrimaryColumn('uuid')
    id: string;

    @Column({length: 50, unique: true})
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    addId(){
        this.id = uuidv4()
    }
}
