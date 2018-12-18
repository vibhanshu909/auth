import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, AfterLoad, AfterInsert, AfterUpdate } from "typeorm";

export default class Base extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: "createdAt", readonly: true })
  createdAtDB: Date;

  // @UpdateDateColumn({ type: "timestamp" })
  @UpdateDateColumn({ name: "updatedAt" })
  updatedAtDB: Date;

  createdAt: string;
  updatedAt: string;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  calcDate() {
    const _ = (date: Date) => date.toLocaleString("en-IN", { timeZone: "Asia/kolkata" })
    this.createdAt = _(this.createdAtDB)
    this.updatedAt = _(this.updatedAtDB)
  }

} 