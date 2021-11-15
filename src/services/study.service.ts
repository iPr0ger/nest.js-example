import { HttpException, Injectable } from '@nestjs/common';
import * as elasticsearch from '@elastic/elasticsearch';

@Injectable()
export class StudyService {

  private readonly elasticsearchService: elasticsearch.Client;

  constructor() {
    this.elasticsearchService = new elasticsearch.Client({
      node: 'http://localhost:9200'
    });
  }

  getByStudyCharacteristics(
    titleContains: string,
    logicalOperator: string,
    topicsInclude: string,
    filters: any,
    page: number,
    size: number
  ) {
    let startFrom = ((page + 1) * size) - size;
    if (startFrom === 1 && size === 1) {
      startFrom = 0;
    }
    let queryCondition: string = (logicalOperator === 'and') ? 'must' : 'should';
    let queryBody = {
      query: {
        bool: {}
      }
    };
    queryBody.query.bool[queryCondition] = [{
      bool: {
        should: [{
          simple_query_string: {
            query: titleContains,
            fields: ['display_title'],
            default_operator: 'and'
          }
        }, {
          nested: {
            path: 'study_titles',
            query: {
              simple_query_string: {
                query: titleContains,
                fields: ['study_titles.title_text'],
                default_operator: 'and'
              }
            }
          }
        }]
      }
    }];
    if (topicsInclude !== null && topicsInclude !== undefined && topicsInclude !== '') {
      queryBody.query.bool[queryCondition].push({
        nested: {
          path: 'study_topics',
          query: {
            simple_query_string: {
              query: topicsInclude,
              fields: ['study_topics.topic_value'],
              default_operator: 'and'
            }
          }
        }
      });
    }
    queryBody.query.bool['must_not'] = filters;

    return this.elasticsearchService.search({
      index: 'study',
      from: startFrom,
      size: size,
      body: queryBody
    }).then(res => res)
      .catch(err => {throw new HttpException(err, 500)})
  }


  getSpecificStudy(
    identType: string,
    identValue: string,
    filters: any,
    page: number,
    size: number
  ){
    let startFrom = ((page + 1) * size) - size;
    if (startFrom === 1 && size === 1) {
      startFrom = 0;
    }
    return this.elasticsearchService.search({
      index: 'study',
      from: startFrom,
      size: size,
      body: {
        query: {
          bool: {
            must: {
              nested: {
                path: 'study_identifiers',
                query: {
                  bool: {
                    must: [
                      {
                        term: {
                          'study_identifiers.identifier_type': identType
                        }
                      },
                      {
                        term: {
                          'study_identifiers.identifier_value': identValue
                        }
                      }
                    ]
                  }
                }
              }
            },
            must_not: filters,
          }
        }
      }
    }).then(res => res)
      .catch(err => {throw new HttpException(err, 500)})
  }

  getFetchedStudy(id: number){
    return this.elasticsearchService.search({
      index: 'study',
      size: 1,
      body: {
        query: {
          term: {
            id: id
          }
        }
      }
    }).then(res => res)
      .catch(err => {throw new HttpException(err, 500)});
  }

  getSelectedStudy(id: number){
    return this.elasticsearchService.search({
      index: 'study',
      size: 1,
      body: {
        query: {
          term: {
            id: id
          }
        }
      }
    }).then(res => res)
      .catch(err => {throw new HttpException(err, 500)});
  }

  getAllByStudyCharacteristics(
    titleContains: string,
    logicalOperator: string,
    topicsInclude: string,
    filters: any,
  ){
    let queryCondition: string = (logicalOperator === 'and') ? 'must' : 'should';
    let queryBody = {
      query: {
        bool: {}
      }
    };
    queryBody.query.bool[queryCondition] = [{
      bool: {
        should: [{
          simple_query_string: {
            query: titleContains,
            fields: ['display_title'],
            default_operator: 'and'
          }
        }, {
          nested: {
            path: 'study_titles',
            query: {
              simple_query_string: {
                query: titleContains,
                fields: ['study_titles.title_text'],
                default_operator: 'and'
              }
            }
          }
        }]
      }
    }];
    if (topicsInclude !== null && topicsInclude !== undefined && topicsInclude !== '') {
      queryBody.query.bool[queryCondition].push({
        nested: {
          path: 'study_topics',
          query: {
            simple_query_string: {
              query: topicsInclude,
              fields: ['study_topics.topic_value'],
              default_operator: 'and'
            }
          }
        }
      });
    }
    queryBody.query.bool['must_not'] = filters;

    return this.elasticsearchService.search({
      index: 'study',
      size: 10000,
      body: queryBody
    }).then(res => res)
      .catch(err => {throw new HttpException(err, 500)})
  }

  getAllSpecificStudy(
    identType: string,
    identValue: string,
    filters: any,
  ){
    return this.elasticsearchService.search({
      index: 'study',
      size: 10000,
      body: {
        query: {
          bool: {
            must: {
              nested: {
                path: 'study_identifiers',
                query: {
                  bool: {
                    must: [
                      {
                        term: {
                          'study_identifiers.identifier_type': identType,
                        }
                      },
                      {
                        term: {
                          'study_identifiers.identifier_value': identValue
                        }
                      }
                    ]
                  }
                }
              }
            },
            must_not: filters,
          }
        }
      }
    }).then(res => res)
      .catch(err => {throw new HttpException(err, 500)})
  }
}