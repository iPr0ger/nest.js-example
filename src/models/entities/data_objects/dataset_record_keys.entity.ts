import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RecordKeyTypesEntity } from '../common.entity';
import { DataObjectEntity } from './data-object.entity';

@Entity({ name: 'object_dataset_recordkeys', schema: 'objects', synchronize: true })
export class DatasetRecordKeyEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => RecordKeyTypesEntity, { nullable: false })
  @JoinColumn({ name: 'recordkey_type_id', referencedColumnName: 'id' })
  keys_type: RecordKeyTypesEntity;

  @Column({ type: 'text', nullable: true })
  keys_details: string;

  @OneToOne(type => DataObjectEntity,
    data_object => data_object.dataset_record_keys, {
      onDelete: 'CASCADE', nullable: false
    })
  data_object: DataObjectEntity;

}
