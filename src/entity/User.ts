import { Entity, Column, PrimaryColumn, BeforeInsert } from "typeorm";
import * as uuidv4 from 'uuid/v4';

@Entity()
export class User {

    @PrimaryColumn('uuid')
    id: string;

    @Column({length: 50})
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    addId(){
        this.id = uuidv4()
    }
}
