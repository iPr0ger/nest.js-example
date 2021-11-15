import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrganizationsEntity, ResourceTypesEntity, UnitsEntity } from '../common.entity';
import { DataObjectEntity } from './data-object.entity';

@Entity({ name: 'object_instances', schema: 'objects', synchronize: true })
export class ObjectInstancesEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => OrganizationsEntity, { nullable: true })
  @JoinColumn({ name: 'repository_org_id', referencedColumnName: 'id' })
  repository_org: OrganizationsEntity;

  @Column({ type: 'boolean', nullable: false, default: false })
  direct_access: boolean;

  @Column({ type: 'varchar', length: 750, nullable: true })
  url: string;

  @Column({ type: 'date', nullable: true })
  url_last_checked: Date;

  @OneToOne(type => ResourceTypesEntity, { nullable: false })
  @JoinColumn({ name: 'resource_type_id', referencedColumnName: 'id' })
  resource_type: ResourceTypesEntity;

  @Column({ nullable: false, default: 0 })
  size: number;

  @OneToOne(type => UnitsEntity, { nullable: false })
  @JoinColumn({ name: 'unit_type_id', referencedColumnName: 'id' })
  size_unit: UnitsEntity;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @ManyToOne(type => DataObjectEntity,
    data_object => data_object.object_instances, {
      onDelete: 'CASCADE', nullable: false
    })
  data_object: DataObjectEntity

}
