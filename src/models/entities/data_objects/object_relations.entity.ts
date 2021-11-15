import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RelationTypesEntity } from '../common.entity';
import { DataObjectEntity } from './data-object.entity';

@Entity({ name: 'object_relations', schema: 'objects', synchronize: true })
export class ObjectRelationsEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => RelationTypesEntity, { nullable: false })
  @JoinColumn({ name: 'relationship_type_id', referencedColumnName: 'id' })
  relationship_type: RelationTypesEntity;

  @Column({ nullable: false })
  target_object_id: number;

  @ManyToOne(type => DataObjectEntity,
    data_object => data_object.object_relationships, {
      onDelete: 'CASCADE', nullable: false
    })
  data_object: DataObjectEntity;

}
