import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DataObjectEntity } from './data-object.entity';

@Entity({ name: 'object_rights', synchronize: true, schema: 'objects' })
export class ObjectRightsEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  rights_name: string;

  @Column({ type: 'varchar', length: 750, nullable: true })
  rights_url: string;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @ManyToOne(type => DataObjectEntity,
    data_object => data_object.object_rights, {
      onDelete: 'CASCADE', nullable: false
    })
  data_object: DataObjectEntity;
}
