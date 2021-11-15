import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FeatureTypesEntity } from '../common.entity';
import { StudyEntity } from './study.entity';

@Entity({ name: 'study_features', synchronize: true, schema: 'studies' })
export class StudyFeaturesEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => FeatureTypesEntity, { nullable: false })
  @JoinColumn({ name: 'feature_type_id', referencedColumnName: 'id' })
  feature_type: FeatureTypesEntity;

  @Column({ type: 'varchar', length: 250, nullable: false })
  feature_value: string;

  @ManyToOne(type => StudyEntity,
    study => study.study_features, {
      onDelete: 'CASCADE', nullable: false
    })
  study: StudyEntity

}
