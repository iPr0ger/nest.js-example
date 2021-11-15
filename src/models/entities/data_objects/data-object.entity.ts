import {
  Column,
  Entity,
  JoinColumn, ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudyEntity } from '../studies/study.entity';
import {
  AccessTypesEntity,
  ObjectClassesEntity,
  ObjectTypesEntity,
  OrganizationsEntity
} from '../common.entity';
import { AccessDetailsEntity } from './access_details.entity';
import { DatasetRecordKeyEntity } from './dataset_record_keys.entity';
import { DatasetDeidentLevelEntity } from './dataset_deidents.entity';
import { DatasetConsentEntity } from './dataset_consents.entity';
import { ObjectInstancesEntity } from './object_instances.entity';
import { ObjectTitlesEntity } from './object_titles.entity';
import { ObjectDatesEntity } from './object_dates.entity';
import { ObjectContributorsEntity } from './object_contributors.entity';
import { ObjectTopicsEntity } from './object_topics.entity';
import { ObjectIdentifiersEntity } from './object_identifiers.entity';
import { ObjectDescriptionsEntity } from './object_descriptions.entity';
import { ObjectRightsEntity } from './object_rights.entity';
import { ObjectRelationsEntity } from './object_relations.entity';


@Entity({ name: 'data_objects', schema: 'objects', synchronize: true })
export class DataObjectEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 350, nullable: true })
  doi: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  display_title: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  version: string;

  @Column({ type: 'text', nullable: true })
  object_interface: string;

  @OneToOne(type => ObjectTypesEntity, { nullable: true })
  @JoinColumn({ name: 'object_type_id', referencedColumnName: 'id' })
  object_type: ObjectTypesEntity;

  @OneToOne(type => ObjectClassesEntity, { nullable: true })
  @JoinColumn({ name: 'object_class_id', referencedColumnName: 'id' })
  object_class: ObjectClassesEntity;

  @Column({ nullable: true })
  publication_year: number;

  @Column({ type: 'varchar', length: 25, nullable: false, default: 'en' })
  lang_code: string;

  @OneToOne(type => OrganizationsEntity, { nullable: true })
  @JoinColumn({ name: 'managing_org_id', referencedColumnName: 'id' })
  managing_organisation: OrganizationsEntity;

  @OneToOne(type => AccessTypesEntity, { nullable: true })
  @JoinColumn({ name: 'access_type_id', referencedColumnName: 'id' })
  access_type: AccessTypesEntity;

  @OneToOne(type => AccessDetailsEntity,
      accessDetails => accessDetails.data_object, {
    cascade: true, nullable: true
    })
  @JoinColumn({ name: 'access_details_id', referencedColumnName: 'id' })
  access_details: AccessDetailsEntity;

  @Column({ nullable: true })
  eosc_category: number;

  @OneToOne(type => DatasetRecordKeyEntity,
      datasetRecordKey => datasetRecordKey.data_object, {
    cascade: true, nullable: true
    })
  @JoinColumn({ name: 'dataset_recordkeys_id', referencedColumnName: 'id' })
  dataset_record_keys: DatasetRecordKeyEntity;

  @OneToOne(type => DatasetDeidentLevelEntity,
      datasetDeidentLevel => datasetDeidentLevel.data_object, {
    cascade: true, nullable: true
    })
  @JoinColumn({ name: 'dataset_deident_id', referencedColumnName: 'id' })
  dataset_deident_level: DatasetDeidentLevelEntity;

  @OneToOne(type => DatasetConsentEntity,
      datasetConsent => datasetConsent.data_object, {
    cascade: true, nullable: true
    })
  @JoinColumn({ name: 'dataset_consent_id', referencedColumnName: 'id' })
  dataset_consent: DatasetConsentEntity;

  @Column({ type: 'varchar', length: 750, nullable: true })
  object_url: string;

  @OneToMany(type => ObjectInstancesEntity,
      object_instance => object_instance.data_object, {
    cascade: true, nullable: true
    })
  object_instances: ObjectInstancesEntity[];

  @OneToMany(type => ObjectTitlesEntity,
      object_title => object_title.data_object, {
    cascade: true, nullable: true
    })
  object_titles: ObjectTitlesEntity[];

  @OneToMany(type => ObjectDatesEntity,
      object_date => object_date.data_object, {
    cascade: true, nullable: true
    })
  object_dates: ObjectDatesEntity[];

  @OneToMany(type => ObjectContributorsEntity,
      object_contributor => object_contributor.data_object, {
    cascade: true, nullable: true
    })
  object_contributors: ObjectContributorsEntity[];

  @OneToMany(type => ObjectTopicsEntity,
      object_topic => object_topic.data_object, {
    cascade: true, nullable: true
    })
  object_topics: ObjectTopicsEntity[];

  @OneToMany(type => ObjectIdentifiersEntity,
      object_identifier => object_identifier.data_object, {
    cascade: true, nullable: true
    })
  object_identifiers: ObjectIdentifiersEntity[];

  @OneToMany(type => ObjectDescriptionsEntity,
      object_description => object_description.data_object, {
    cascade: true, nullable: true
    })
  object_descriptions: ObjectDescriptionsEntity[];

  @OneToMany(type => ObjectRightsEntity,
      object_right => object_right.data_object, {
    cascade: true, nullable: true
    })
  object_rights: ObjectRightsEntity[];

  @OneToMany(type => ObjectRelationsEntity,
      object_relation => object_relation.data_object, {
    cascade: true, nullable: true
    })
  object_relationships: ObjectRelationsEntity[];

  @ManyToMany(type => StudyEntity, study => study.linked_data_objects)
  linked_studies: StudyEntity[];

  @Column({ type: 'text', nullable: true })
  provenance_string: string;
}
