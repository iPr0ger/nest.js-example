import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'users', schema: 'users', synchronize: true })
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 250, type: 'varchar' })
  username: string;

}
