import { DataObject } from './data-object';

interface MinAge{
  value: number;
  unit_name: string;
}

interface MaxAge{
  value: number;
  unit_name: string;
}

interface StudyIdentifier {
  id: number;
  identifier_value: string;
  identifier_type: string;
  identifier_date: Date;
  identifier_link: string;
  identifier_org: string;
}

interface StudyTitle {
  id: number;
  title_type: string;
  title_text: string;
  lang_code: string;
  comments: string;
}

interface StudyFeature{
  id: number;
  feature_type: string;
  feature_value: string;
}

interface StudyTopic{
  id: number;
  topic_type: string;
  mesh_coded: boolean;
  topic_code: string;
  topic_value: string;
  topic_qualcode: string;
  topic_qualvalue: string;
  original_value: string;
}

interface StudyRelation{
  id: number;
  relationship_type: string;
  target_study_id: number;
}

export interface Study {
  id: number;
  display_title: string;
  brief_description: string;
  data_sharing_statement: string;
  study_type: string;
  study_status: string;
  study_gender_elig: string;
  study_enrolment: number;
  min_age: MinAge;
  max_age: MaxAge;
  study_identifiers: StudyIdentifier[];
  study_titles: StudyTitle[];
  study_features: StudyFeature[];
  study_topics: StudyTopic[];
  study_relationships: StudyRelation[];
  linked_data_objects: Array<DataObject>;
  provenance_string: string;
}
