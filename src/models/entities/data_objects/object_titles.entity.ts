import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TitleTypesEntity } from '../common.entity';
import { DataObjectEntity } from './data-object.entity';

@Entity({ name: 'object_titles', schema: 'objects', synchronize: true })
export class ObjectTitlesEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => TitleTypesEntity, { nullable: false })
  @JoinColumn({ name: 'title_type_id', referencedColumnName: 'id' })
  title_type: TitleTypesEntity;

  @Column({ type: 'varchar', length: 750, nullable: true })
  title_text: string;

  @Column({ type: 'varchar', length: 25, nullable: false, default: 'en' })
  lang_code: string;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @ManyToOne(type => DataObjectEntity,
    data_object => data_object.object_titles, {
      onDelete: 'CASCADE', nullable: false
    })
  data_object: DataObjectEntity;
}
