import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DataObjectEntity } from './data-object.entity';

@Entity({ name: 'object_access_details', schema: 'objects', synchronize: true })
export class AccessDetailsEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column( { type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 750, nullable: true })
  url: string

  @Column({ type: 'date', nullable: true })
  url_last_checked: Date;

  @OneToOne(type => DataObjectEntity,
    data_object => data_object.access_details, {
      onDelete: 'CASCADE', nullable: false
    })
  data_object: DataObjectEntity;

}
