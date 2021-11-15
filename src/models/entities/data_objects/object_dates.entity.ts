import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DateTypesEntity } from '../common.entity';
import { DataObjectEntity } from './data-object.entity';

@Entity({ name: 'object_dates', schema: 'objects', synchronize: true })
export class ObjectDatesEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => DateTypesEntity, { nullable: false })
  @JoinColumn({ name: 'date_type_id', referencedColumnName: 'id' })
  date_type: DateTypesEntity;

  @Column({ type: 'boolean', nullable: true, default: false })
  is_date_range: boolean;

  @Column({ type: 'varchar', length: 250, nullable: true })
  date_as_string: string;

  @Column({ nullable: true })
  start_year: number;

  @Column({ nullable: true })
  start_month: number;

  @Column({ nullable: true })
  start_day: number;

  @Column({ nullable: true })
  end_year: number;

  @Column({ nullable: true })
  end_month: number;

  @Column({ nullable: true })
  end_day: number;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @ManyToOne(type => DataObjectEntity,
    data_object => data_object.object_dates, {
      onDelete: 'CASCADE', nullable: false
    })
  data_object: DataObjectEntity;

}
