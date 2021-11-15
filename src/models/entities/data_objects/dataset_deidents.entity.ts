import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DeidentTypesEntity } from '../common.entity';
import { DataObjectEntity } from './data-object.entity';

@Entity({ name: 'object_dataset_deident', synchronize: true, schema: 'objects' })
export class DatasetDeidentLevelEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => DeidentTypesEntity, { nullable: false })
  @JoinColumn({ name: 'deident_type_id', referencedColumnName: 'id' })
  deident_type: DeidentTypesEntity;

  @Column({ type: 'boolean', nullable: false, default: false })
  deident_direct: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  deident_hipaa: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  deident_dates: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  deident_nonarr: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  deident_kanon: boolean;

  @Column({ type: 'text', nullable: true })
  deident_details: string;

  @OneToOne(type => DataObjectEntity,
    data_object => data_object.dataset_deident_level, {
      onDelete: 'CASCADE', nullable: false
    })
  data_object: DataObjectEntity

}
