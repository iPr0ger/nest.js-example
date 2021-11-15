import { Column, Entity, PrimaryColumn } from 'typeorm';


@Entity({ name: 'study_types', schema: 'common', synchronize: true })
export class StudyTypesEntity {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

}

@Entity({ name: 'study_statuses', schema: 'common', synchronize: true })
export class StudyStatusesEntity {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

}

@Entity({ name: 'gender_eligibility_types', schema: 'common', synchronize: true })
export class GenderEligibilityEntity {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

}

@Entity({ name: 'feature_types', schema: 'common', synchronize: true })
export class FeatureTypesEntity {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

}

@Entity({ name: 'topic_types', schema: 'common', synchronize: true })
export class TopicTypesEntity {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

}

@Entity({ name: 'identifier_types', schema: 'common', synchronize: true })
export class IdentifierTypesEntity {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

}

@Entity({ name: 'unit_types', synchronize: true, schema: 'common' })
export class UnitsEntity {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

}

@Entity({ name: 'persons', schema: 'common', synchronize: true })
export class PersonEntity {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: true })
  family_name: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  given_name: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  full_name: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  orcid: string;

  @Column({ type: 'text', nullable: true })
  affiliation: string;

}

@Entity({ name: 'relation_types', schema: 'common', synchronize: true })
export class RelationTypesEntity {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

}

@Entity({ name: 'title_types', synchronize: true, schema: 'common' })
export class TitleTypesEntity {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

}

@Entity({ name: 'description_types', schema: 'common', synchronize: true })
export class DescriptionTypesEntity {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

}

@Entity({ name: 'access_types', schema: 'common', synchronize: true })
export class AccessTypesEntity {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

}

@Entity({ name: 'record_key_types', synchronize: true, schema: 'common' })
export class RecordKeyTypesEntity {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

}

@Entity({ name: 'deident_types', schema: 'common', synchronize: true })
export class DeidentTypesEntity {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

}

@Entity({ name: 'consent_types', synchronize: true, schema: 'common' })
export class ConsentTypesEntity {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

}

@Entity({ name: 'date_types', schema: 'common', synchronize: true })
export class DateTypesEntity {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

}

@Entity({ name: 'contributor_types', synchronize: true, schema: 'common' })
export class ContributorTypesEntity {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

}

@Entity({ name: 'organisations', schema: 'common', synchronize: true })
export class OrganizationsEntity {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

}

@Entity({ name: 'resource_types', schema: 'common', synchronize: true })
export class ResourceTypesEntity {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

}

@Entity({ name: 'object_types', schema: 'common', synchronize: true })
export class ObjectTypesEntity {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

}

@Entity({ name: 'object_classes', schema: 'common', synchronize: true })
export class ObjectClassesEntity {

  @PrimaryColumn({ nullable: false })
  id: number;

  @Column({ type: 'varchar', length: 250, nullable: false })
  name: string;

}

