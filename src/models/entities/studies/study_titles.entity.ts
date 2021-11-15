import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TitleTypesEntity } from '../common.entity';
import { StudyEntity } from './study.entity';

@Entity({ name: 'study_titles', schema: 'studies', synchronize: true })
export class StudyTitlesEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => TitleTypesEntity, { nullable: false })
  @JoinColumn({ name: 'title_type_id', referencedColumnName: 'id' })
  title_type: TitleTypesEntity;

  @Column({ type: 'text', nullable: true })
  title_text: string;

  @Column({ type: 'varchar', length: 25, nullable: false, default: 'en' })
  lang_code: string;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @ManyToOne(type => StudyEntity,
    study => study.study_titles, {
      onDelete: 'CASCADE', nullable: false
    })
  study: StudyEntity

}
