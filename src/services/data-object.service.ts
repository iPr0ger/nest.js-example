import { HttpException, Injectable } from '@nestjs/common';
import * as elasticsearch from '@elastic/elasticsearch';

@Injectable()
export class DataObjectService {

  private readonly elasticsearchService: elasticsearch.Client;

  constructor() {
    this.elasticsearchService = new elasticsearch.Client({
      node: 'http://localhost:9200'
    });
  }

  getFetchedDataObjects(
    ids: number[],
    size: number
  ){
    return this.elasticsearchService.search({
      index: 'data-object',
      size: size,
      body: {
        query: {
          bool: {
            filter: [{
              terms: {
                id: ids
              }
            }]
          }
        }
      }
    }).then(res => res)
      .catch(err => {throw new HttpException(err, 500)})
  }

  getViaPublishedPaper(
    searchType: string,
    searchValue: string,
    filters: any,
    page: number,
    size: number
  ){
    let startFrom = ((page + 1) * size) - size;
    if (startFrom === 1 && size === 1) {
      startFrom = 0;
    }
    let queryBody = {
      query: {
        bool: {}
      }
    };

    if (searchType === 'doi') {
      queryBody.query.bool['must'] = {
        term: {
          doi: searchValue
        }
      }
    } else {
      queryBody.query.bool['must'] = [{
        bool: {
          should: [{
            simple_query_string: {
              query: searchValue,
              fields: ['display_title'],
              default_operator: 'and'
            }
          }, {
            nested: {
              path: 'object_titles',
              query: {
                simple_query_string: {
                  query: searchValue,
                  fields: ['object_titles.title_text'],
                  default_operator: 'and'
                }
              }
            }
          }],
          minimum_should_match: 1
        }
      }];
    }

    return this.elasticsearchService.search({
      index: 'data-object',
      from: startFrom,
      size: size,
      body: queryBody
    }).then(res => res)
      .catch(err => {throw new HttpException(err, 500)})
  }

  getAllViaPublishedPaper(
    searchType: string,
    searchValue: string,
    filters: any
  ){
    let queryBody = {
      query: {
        bool: {}
      }
    };

    if (searchType === 'doi') {
      queryBody.query.bool['must'] = {
        term: {
          doi: searchValue
        }
      }
    } else {
      queryBody.query.bool['must'] = [{
        bool: {
          should: [{
            simple_query_string: {
              query: searchValue,
              fields: ['display_title'],
              default_operator: 'and'
            }
          }, {
            nested: {
              path: 'object_titles',
              query: {
                simple_query_string: {
                  query: searchValue,
                  fields: ['object_titles.title_text'],
                  default_operator: 'and'
                }
              }
            }
          }],
          minimum_should_match: 1
        }
      }];
    }

    return this.elasticsearchService.search({
      index: 'data-object',
      size: 10000,
      body: queryBody
    }).then(res => res)
      .catch(err => {throw new HttpException(err, 500)})
  }


}