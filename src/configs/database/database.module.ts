import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserEntity } from '../../models/entities/user.entity';
import {
  AccessTypesEntity, ConsentTypesEntity, ContributorTypesEntity,
  DateTypesEntity, DeidentTypesEntity,
  DescriptionTypesEntity,
  FeatureTypesEntity,
  GenderEligibilityEntity,
  IdentifierTypesEntity, ObjectClassesEntity, ObjectTypesEntity,
  OrganizationsEntity,
  PersonEntity,
  RecordKeyTypesEntity,
  RelationTypesEntity, ResourceTypesEntity,
  StudyStatusesEntity,
  StudyTypesEntity,
  TitleTypesEntity,
  TopicTypesEntity,
  UnitsEntity,
} from '../../models/entities/common.entity';
import { StudyEntity } from '../../models/entities/studies/study.entity';
import { MaxAgeEntity } from '../../models/entities/studies/max_age.entity';
import { MinAgeEntity } from '../../models/entities/studies/min_age.entity';
import { StudyFeaturesEntity } from '../../models/entities/studies/study_features.entity';
import { StudyIdentifiersEntity } from '../../models/entities/studies/study_identifiers.entity';
import { StudyRelationsEntity } from '../../models/entities/studies/study_relations.entity';
import { StudyTitlesEntity } from '../../models/entities/studies/study_titles.entity';
import { StudyTopicsEntity } from '../../models/entities/studies/study_topics.entity';
import { DataObjectEntity } from '../../models/entities/data_objects/data-object.entity';
import { AccessDetailsEntity } from '../../models/entities/data_objects/access_details.entity';
import { DatasetConsentEntity } from '../../models/entities/data_objects/dataset_consents.entity';
import { DatasetDeidentLevelEntity } from '../../models/entities/data_objects/dataset_deidents.entity';
import { DatasetRecordKeyEntity } from '../../models/entities/data_objects/dataset_record_keys.entity';
import { ObjectContributorsEntity } from '../../models/entities/data_objects/object_contributors.entity';
import { ObjectDatesEntity } from '../../models/entities/data_objects/object_dates.entity';
import { ObjectDescriptionsEntity } from '../../models/entities/data_objects/object_descriptions.entity';
import { ObjectIdentifiersEntity } from '../../models/entities/data_objects/object_identifiers.entity';
import { ObjectInstancesEntity } from '../../models/entities/data_objects/object_instances.entity';
import { ObjectRelationsEntity } from '../../models/entities/data_objects/object_relations.entity';
import { ObjectRightsEntity } from '../../models/entities/data_objects/object_rights.entity';
import { ObjectTitlesEntity } from '../../models/entities/data_objects/object_titles.entity';
import { ObjectTopicsEntity } from '../../models/entities/data_objects/object_topics.entity';



@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'ujhzyby12345',
    database: 'mdr_dev',
    entities: [
      //User's entities
      UserEntity,

      // Common entities
      StudyTypesEntity,
      StudyStatusesEntity,
      GenderEligibilityEntity,
      FeatureTypesEntity,
      TopicTypesEntity,
      TitleTypesEntity,
      DescriptionTypesEntity,
      DateTypesEntity,
      IdentifierTypesEntity,
      UnitsEntity,
      PersonEntity,
      OrganizationsEntity,
      RelationTypesEntity,
      AccessTypesEntity,
      RecordKeyTypesEntity,
      DeidentTypesEntity,
      ConsentTypesEntity,
      ContributorTypesEntity,
      ResourceTypesEntity,
      ObjectTypesEntity,
      ObjectClassesEntity,

      // Study entities
      StudyEntity,
      MaxAgeEntity,
      MinAgeEntity,
      StudyFeaturesEntity,
      StudyIdentifiersEntity,
      StudyRelationsEntity,
      StudyTitlesEntity,
      StudyTopicsEntity,

      // Object entities
      DataObjectEntity,
      AccessDetailsEntity,
      DatasetConsentEntity,
      DatasetDeidentLevelEntity,
      DatasetRecordKeyEntity,
      ObjectContributorsEntity,
      ObjectDatesEntity,
      ObjectDescriptionsEntity,
      ObjectIdentifiersEntity,
      ObjectInstancesEntity,
      ObjectRelationsEntity,
      ObjectRightsEntity,
      ObjectTitlesEntity,
      ObjectTopicsEntity
    ],
    synchronize: true,
    extra: {
      charset: 'utf8'
    }
  })]
})

export class DatabaseModule {}
