import { IsEmail, MinLength, validate } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";

import Base from './Base';

@Entity()
export class User extends Base {

    @MinLength(5)
    @IsEmail()
    @Column({ nullable: false, length: 50, unique: true, readonly: true })
    email: string;

    @MinLength(8)
    @Column({ nullable: false })
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async validateOnSave() {
        const errors = await validate(this)
        const gqlError: any[] = []
        // new GraphQLError({data: })
        if (errors.length > 0) {
            console.log("validation failed. errors: ", errors);
            errors.forEach(error => {
                gqlError.push({ [error.property]: Object.values(error.constraints) })
            })
            // throw UserInputError()
        } else {
            console.log("validation succeed");
        }
        console.log(errors)
    }
    toString() {
        return `${this.id} | ${this.email}`
    }
}
