import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IdentifierTypesEntity, OrganizationsEntity } from '../common.entity';
import { DataObjectEntity } from './data-object.entity';

@Entity({ name: 'object_identifiers', schema: 'objects', synchronize: true })
export class ObjectIdentifiersEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  identifier_value: string;

  @OneToOne(type => IdentifierTypesEntity, { nullable: false })
  @JoinColumn({ name: 'identifier_type_id', referencedColumnName: 'id' })
  identifier_type: IdentifierTypesEntity;

  @Column({ type: 'date', nullable: true })
  identifier_date: Date;

  @OneToOne(type => OrganizationsEntity, { nullable: true })
  @JoinColumn({ name: 'org_id', referencedColumnName: 'id' })
  identifier_org: OrganizationsEntity;

  @ManyToOne(type => DataObjectEntity,
    data_object => data_object.object_identifiers, {
      onDelete: 'CASCADE', nullable: false
    })
  data_object: DataObjectEntity;

}
