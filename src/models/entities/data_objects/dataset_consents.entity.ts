import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ConsentTypesEntity } from '../common.entity';
import { DataObjectEntity } from './data-object.entity';

@Entity({ name: 'object_dataset_consents', synchronize: true, schema: 'objects' })
export class DatasetConsentEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => ConsentTypesEntity, { nullable: false })
  @JoinColumn({ name: 'consent_type_id', referencedColumnName: 'id' })
  consent_type: ConsentTypesEntity;

  @Column({ type: 'boolean', nullable: false, default: false })
  consent_noncommercial: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  consent_geog_restrict: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  consent_research_type: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  consent_genetic_only: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  consent_no_methods: boolean;

  @Column({ type: 'text', nullable: true })
  consents_details: string;

  @OneToOne(type => DataObjectEntity,
    data_object => data_object.dataset_consent, {
      onDelete: 'CASCADE', nullable: false
    })
  data_object: DataObjectEntity;

}
