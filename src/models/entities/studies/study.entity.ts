import {
  Column,
  Entity,
  JoinColumn, JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DataObjectEntity } from '../data_objects/data-object.entity';
import {
  GenderEligibilityEntity,
  StudyStatusesEntity,
  StudyTypesEntity,
} from '../common.entity';
import { MinAgeEntity } from './min_age.entity';
import { MaxAgeEntity } from './max_age.entity';
import { StudyIdentifiersEntity } from './study_identifiers.entity';
import { StudyTitlesEntity } from './study_titles.entity';
import { StudyFeaturesEntity } from './study_features.entity';
import { StudyTopicsEntity } from './study_topics.entity';
import { StudyRelationsEntity } from './study_relations.entity';


@Entity({ name: 'studies', schema: 'studies', synchronize: true })
export class StudyEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, type: 'varchar', nullable: false })
  display_title: string;

  @Column({ type: 'text', nullable: true })
  brief_description: string;

  @Column({ type: 'text', nullable: true })
  data_sharing_statement: string;

  @OneToOne(type => StudyTypesEntity, { nullable: true })
  @JoinColumn({ name: 'study_type_id', referencedColumnName: 'id' })
  study_type: StudyTypesEntity;

  @OneToOne(type => StudyStatusesEntity, { nullable: true })
  @JoinColumn({ name: 'study_status_id', referencedColumnName: 'id' })
  study_status: StudyStatusesEntity;

  @OneToOne(type => GenderEligibilityEntity, { nullable: true })
  @JoinColumn({ name: 'gender_elig_id', referencedColumnName: 'id' })
  study_gender_elig: GenderEligibilityEntity;

  @Column({ nullable: true })
  study_enrolment: number;

  @OneToOne(type => MinAgeEntity, minAge => minAge.study, {
    cascade: true, nullable: true
  })
  @JoinColumn({ name: 'min_age_id', referencedColumnName: 'id' })
  min_age: MinAgeEntity;

  @OneToOne(type => MaxAgeEntity, maxAge => maxAge.study, {
    cascade: true, nullable: true
  })
  @JoinColumn({ name: 'max_age_id', referencedColumnName: 'id' })
  max_age: MaxAgeEntity;

  @OneToMany(type => StudyIdentifiersEntity,
    studyIdentifier => studyIdentifier.study, {
      cascade: true, nullable: true
    })
  study_identifiers: StudyIdentifiersEntity[];

  @OneToMany(type => StudyTitlesEntity,
    studyTitle => studyTitle.study, {
      cascade: true, nullable: true
    })
  study_titles: StudyTitlesEntity[];

  @OneToMany(type => StudyFeaturesEntity,
    studyFeature => studyFeature.study, {
      cascade: true, nullable: true
    })
  study_features: StudyFeaturesEntity[];

  @OneToMany(type => StudyTopicsEntity,
    studyTopic => studyTopic.study, {
      cascade: true, nullable: true
    })
  study_topics: StudyTopicsEntity[];

  @OneToMany(type => StudyRelationsEntity,
    studyRelation => studyRelation.study, {
      cascade: true, nullable: true
    })
  study_relations: StudyRelationsEntity[];

  @ManyToMany(type => DataObjectEntity,
    data_object => data_object.linked_studies, {
      cascade: true, nullable: true
    })
  @JoinTable({
    name: 'studies_objects',
    joinColumn: {
      name: 'data_object_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'study_id',
      referencedColumnName: 'id'
    }
  })
  linked_data_objects: DataObjectEntity[];

  @Column({ type: 'text', nullable: true })
  provenance_string: string;

}





