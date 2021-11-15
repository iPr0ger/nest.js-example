import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TopicTypesEntity } from '../common.entity';
import { StudyEntity } from './study.entity';

@Entity({ name: 'study_topics', schema: 'studies', synchronize: true })
export class StudyTopicsEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => TopicTypesEntity, { nullable: false })
  @JoinColumn({ name: 'topic_type_id', referencedColumnName: 'id' })
  topic_type: TopicTypesEntity;

  @Column({ type: 'boolean', nullable: false, default: false })
  mesh_coded: boolean;

  @Column({ type: 'varchar', length: 500, nullable: true })
  topic_code: string;

  @Column({ type: 'varchar', length: 750, nullable: true })
  topic_value: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  topic_qualcode: string;

  @Column({ type: 'varchar', length: 750, nullable: true })
  topic_qualvalue: string;

  @Column({ type: 'varchar', length: 750, nullable: true })
  original_value: string;

  @ManyToOne(type => StudyEntity,
    study => study.study_topics, {
      onDelete: 'CASCADE', nullable: false
    })
  study: StudyEntity

}
