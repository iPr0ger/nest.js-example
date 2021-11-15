interface AccessDetails {
  id?: number;
  description: string;
  url: string;
  url_last_checked: Date;
}

interface DataSetRecordKey{
  id?: number;
  keys_type: string;
  keys_details: string;
}

interface DataSetDeidentLevel{
  id?: number;
  deident_type: string;
  deident_direct: boolean;
  deident_hipaa: boolean;
  deident_dates: boolean;
  deident_nonarr: boolean;
  deident_kanon: boolean;
  deident_details: string;
}

interface DataSetConsent{
  id?: number;
  consent_type: string;
  consent_noncommercial: boolean;
  consent_geog_restrict: boolean;
  consent_research_type: boolean;
  consent_genetic_only: boolean;
  consent_no_methods: boolean;
  consents_details: string;
}

interface InstanceAccessDetails{
  direct_access: boolean;
  url: string;
  url_last_checked: Date;
}

interface InstanceResourceDetails{
  type_name: string;
  size: number;
  size_unit: string;
  comments: string;
}

interface ObjectInstance{
  id: number;
  repository_org: number;
  access_details: InstanceAccessDetails;
  resource_details: InstanceResourceDetails;
}

interface ObjectTitle{
  id: number;
  title_type: string;
  title_text: string;
  lang_code: string;
  comments: string;
}

interface StartDate{
  year: number;
  month: number;
  day: number;
}

interface EndDate{
  year: number;
  month: number;
  day: number;
}

interface ObjectDate{
  id: number;
  date_type: string;
  is_date_range: boolean;
  date_as_string: string;
  start_date: StartDate;
  end_date: EndDate;
  comments: string;
}

interface Person {
  id?: number;
  family_name: string;
  given_name: string;
  full_name: string;
  orcid: string;
  affiliation: string;
}

interface ObjectContributor{
  id: number;
  contribution_type: string;
  is_individual: boolean;
  organisation: string;
  person: Person;
}

interface ObjectTopic{
  id: number;
  topic_type: string;
  mesh_coded: boolean;
  topic_code: string;
  topic_value: string;
  topic_qualcode: string;
  topic_qualvalue: string;
  original_value: string;
}

interface ObjectIdentifier{
  id: number;
  identifier_value: string;
  identifier_type: string;
  identifier_date: Date;
  identifier_org: string;
}

interface ObjectDescription{
  id: number;
  description_type: string;
  description_label: string;
  description_text: string;
  lang_code: string;
}

interface ObjectRight{
  id: number;
  rights_name: string;
  rights_url: string;
  comments: string;
}

interface ObjectRelation{
  id: number;
  relationship_type: string;
  target_object_id: number;
}


export interface DataObject{
  id: number;
  doi: string;
  display_title: string;
  version: string;
  object_interface: string;
  object_class: string;
  object_type: string;
  publication_year: number;
  lang_code: string;
  managing_organisation: string;
  access_type: string;
  access_details: AccessDetails;
  eosc_category: number;
  dataset_record_keys: DataSetRecordKey;
  dataset_deident_level: DataSetDeidentLevel;
  dataset_consent: DataSetConsent;
  object_url: string;
  object_instances: ObjectInstance[];
  object_titles: ObjectTitle[];
  object_dates: ObjectDate[];
  object_contributors: ObjectContributor[];
  object_topics: ObjectTopic[];
  object_identifiers: ObjectIdentifier[];
  object_descriptions: ObjectDescription[];
  object_rights: ObjectRight[];
  object_relationships: ObjectRelation[];
  linked_studies: Array<number>;
  provenance_string: string;
}
