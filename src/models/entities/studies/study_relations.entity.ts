import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RelationTypesEntity } from '../common.entity';
import { StudyEntity } from './study.entity';

@Entity({ name: 'study_relations', synchronize: true, schema: 'studies' })
export class StudyRelationsEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => RelationTypesEntity, { nullable: false })
  @JoinColumn({ name: 'relationship_type_id', referencedColumnName: 'id' })
  relationship_type: RelationTypesEntity;

  @Column({ nullable: false })
  target_study_id: number;

  @ManyToOne(type => StudyEntity,
    study => study.study_relations, {
      onDelete: 'CASCADE', nullable: false
    })
  study: StudyEntity

}
