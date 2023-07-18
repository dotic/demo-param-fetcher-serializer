import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class Person {
  @Column('varchar', { length: 255, unique: true })
  @Expose({ groups: ['default'] })
  public email!: string;

  @Column('varchar', { length: 255 })
  @Expose({ groups: ['default'] })
  public givenName!: string;

  @PrimaryGeneratedColumn('uuid')
  @Expose({ groups: ['default'] })
  public id!: string;

  @Column('varchar', { length: 255 })
  @Exclude()
  public surname!: string;

  public constructor(values) {
    Object.assign(this, values);
  }
}
