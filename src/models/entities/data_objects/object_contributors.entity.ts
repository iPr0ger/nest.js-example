import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ContributorTypesEntity, OrganizationsEntity, PersonEntity } from '../common.entity';
import { DataObjectEntity } from './data-object.entity';

@Entity({ name: 'object_contributors', synchronize: true, schema: 'objects' })
export class ObjectContributorsEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => ContributorTypesEntity, { nullable: false })
  @JoinColumn({ name: 'contributor_type_id', referencedColumnName: 'id' })
  contribution_type: ContributorTypesEntity;

  @Column({ type: 'boolean', nullable: true, default: false })
  is_individual: boolean;

  @OneToOne(type => OrganizationsEntity, { nullable: true })
  @JoinColumn({ name: 'org_id', referencedColumnName: 'id' })
  organisation: OrganizationsEntity;

  @OneToOne(type => PersonEntity, { nullable: true })
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person: PersonEntity;

  @ManyToOne(type => DataObjectEntity,
    data_object => data_object.object_contributors, {
      onDelete: 'CASCADE', nullable: false
    })
  data_object: DataObjectEntity;

}
