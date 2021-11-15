import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UnitsEntity } from '../common.entity';
import { StudyEntity } from './study.entity';

@Entity({ name: 'study_min_age', schema: 'studies', synchronize: true })
export class MinAgeEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: 0 })
  value: number;

  @OneToOne(type => UnitsEntity, { nullable: false })
  @JoinColumn({ name: 'unit_type_id', referencedColumnName: 'id' })
  unit: UnitsEntity;

  @OneToOne(type => StudyEntity,
    study => study.min_age, {
      onDelete: 'CASCADE', nullable: false
    })
  study: StudyEntity;

}
