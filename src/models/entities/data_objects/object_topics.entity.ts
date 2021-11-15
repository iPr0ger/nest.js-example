import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TopicTypesEntity } from '../common.entity';
import { DataObjectEntity } from './data-object.entity';

@Entity({ name: 'object_topics', schema: 'objects', synchronize: true })
export class ObjectTopicsEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => TopicTypesEntity, { nullable: false })
  @JoinColumn({ name: 'topic_type_id', referencedColumnName: 'id' })
  topic_type: TopicTypesEntity;

  @Column({ type: 'boolean', nullable: false, default: false })
  mesh_coded: boolean;

  @Column({ type: 'varchar', length: 750, nullable: true })
  topic_code: string;

  @Column({ type: 'text', nullable: true })
  topic_value: string;

  @Column({ type: 'varchar', length: 750, nullable: true })
  topic_qualcode: string;

  @Column({ type: 'text', nullable: true })
  topic_qualvalue: string;

  @Column({ type: 'text', nullable: true })
  original_value: string;

  @ManyToOne(type => DataObjectEntity,
    data_object => data_object.object_topics, {
      onDelete: 'CASCADE', nullable: false
    })
  data_object: DataObjectEntity;

}
