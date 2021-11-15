import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IdentifierTypesEntity, OrganizationsEntity } from '../common.entity';
import { StudyEntity } from './study.entity';

@Entity({ name: 'study_identifiers', schema: 'studies', synchronize: true })
export class StudyIdentifiersEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 750, nullable: false })
  identifier_value: string;

  @OneToOne(type => IdentifierTypesEntity, { nullable: false })
  @JoinColumn({ name: 'identifier_type_id', referencedColumnName: 'id' })
  identifier_type: IdentifierTypesEntity;

  @Column({ type: 'date', nullable: true })
  identifier_date: Date;

  @Column({ type: 'varchar', length: 750, nullable: true })
  identifier_link: string;

  @OneToOne(type => OrganizationsEntity, { nullable: true })
  @JoinColumn({ name: 'org_id', referencedColumnName: 'id' })
  identifier_org: OrganizationsEntity;

  @ManyToOne(type => StudyEntity,
    study => study.study_identifiers, {
      onDelete: 'CASCADE', nullable: false
    })
  study: StudyEntity

}
