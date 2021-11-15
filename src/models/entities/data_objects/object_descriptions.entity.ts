import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DescriptionTypesEntity } from '../common.entity';
import { DataObjectEntity } from './data-object.entity';

@Entity({ name: 'object_descriptions', synchronize: true, schema: 'objects' })
export class ObjectDescriptionsEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => DescriptionTypesEntity, { nullable: false })
  @JoinColumn({ name: 'description_type_id', referencedColumnName: 'id' })
  description_type: DescriptionTypesEntity;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description_label: string;

  @Column({ type: 'text', nullable: true })
  description_text: string;

  @Column({ type: 'varchar', length: 25, nullable: false,  default: 'en' })
  lang_code: string;

  @ManyToOne(type => DataObjectEntity,
    data_object => data_object.object_descriptions, {
      onDelete: 'CASCADE', nullable: false
    })
  data_object: DataObjectEntity;

}
