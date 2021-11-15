import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { StudyService } from '../services/study.service';
import { DataObjectService } from '../services/data-object.service';
import { studyIdentifiers } from '../configs/types/identifier_types';

@Controller('rest-api')
export class RestApiController {

  constructor(
    private studyService: StudyService,
    private dataObjectService: DataObjectService
  ) {
  }

  @Get('/study-characteristics')
  async getByStudyCharacteristics(@Req() request: Request){
    let studies: Array<any> = [];

    let titleContains = request.query['title_contains'].toString();
    if (titleContains !== null && titleContains !== undefined && titleContains !== '') {
      titleContains = titleContains.replace('+', ' ');
    }

    let topicsInclude = request.query['topics_include'].toString();
    if (topicsInclude !== null && topicsInclude !== undefined && topicsInclude !== '') {
      topicsInclude = topicsInclude.replace('+', ' ');
    }

    let filters = [];

    const logicalOperator = request.query['logical_operator'].toString();

    const page = parseInt(request.query['page'].toString());
    const size = parseInt(request.query['size'].toString());

    let result = await this.studyService.getByStudyCharacteristics(titleContains, logicalOperator, topicsInclude, filters, page, size);
    for (let study of result.body.hits.hits){
      const linkedDataObjects = study._source['linked_data_objects'];
      const fetchedDataObject = await this.dataObjectService.getFetchedDataObjects(linkedDataObjects, linkedDataObjects.length);
      let dataObjects: Array<any> = [];
      for (let dataObject of fetchedDataObject.body.hits.hits){
        dataObjects.push(dataObject._source);
      }
      study._source['linked_data_objects'] = dataObjects;
      studies.push(study._source);
    }
    return {
      total: result.body.hits.total.value,
      current_page: page,
      size: size,
      data: studies
    };
  }

  @Get('/specific-study')
  async getSpecificStudy(@Req() request: Request){
    let studies: Array<any> = [];

    let filters = [];

    const page = parseInt(request.query['page'].toString());
    const size = parseInt(request.query['size'].toString());

    const identTypeID = parseInt(request.query['type'].toString());
    const identTypeObj = studyIdentifiers.find(i => i.id === identTypeID);
    const identType = identTypeObj.name;

    let searchValue = request.query['value'].toString();
    if (searchValue !== null && searchValue !== undefined && searchValue !== '') {
      searchValue = searchValue.replace('+', ' ');
    }

    let result = await this.studyService.getSpecificStudy(identType, searchValue, filters, page, size);
    for (let study of result.body.hits.hits){
      const linkedDataObjects = study._source['linked_data_objects'];
      const fetchedDataObject = await this.dataObjectService.getFetchedDataObjects(linkedDataObjects, linkedDataObjects.length);
      let dataObjects: Array<any> = [];
      for (let dataObject of fetchedDataObject.body.hits.hits){
        dataObjects.push(dataObject._source);
      }
      study._source['linked_data_objects'] = dataObjects;
      studies.push(study._source);
    }
    return {
      total: result.body.hits.total.value,
      current_page: page,
      size: size,
      data: studies
    };
  }

  @Get('/via-published-paper')
  async getViaPublishedPaper(@Req() request: Request){
    let studies: Array<any> = [];

    let filters = [];

    const page = parseInt(request.query['page'].toString());
    const size = parseInt(request.query['size'].toString());

    const searchType = request.query['type'].toString();
    let searchValue = request.query['value'].toString();
    if (searchValue !== null && searchValue !== undefined && searchValue !== '') {
      searchValue = searchValue.replace('+', ' ');
    }

    const resultDataObjects = await this.dataObjectService.getViaPublishedPaper(searchType, searchValue, filters, page, size);
    for (let resDataObject of resultDataObjects.body.hits.hits) {
      if (resDataObject._source['linked_studies'].length > 0) {
        const studyId = resDataObject._source['linked_studies'][0];
        const fetchedStudy = await this.studyService.getFetchedStudy(studyId);
        let study = fetchedStudy.body.hits.hits[0]._source;
        const linkedDataObjects = study['linked_data_objects'];
        const fetchedDataObject = await this.dataObjectService.getFetchedDataObjects(linkedDataObjects, linkedDataObjects.length);
        let dataObjects: Array<any> = [];
        for (let dataObject of fetchedDataObject.body.hits.hits){
          dataObjects.push(dataObject._source);
        }
        study['linked_data_objects'] = dataObjects;
        studies.push(study);
      }
    }
    return {
      total: resultDataObjects.body.hits.total.value,
      current_page: page,
      size: size,
      data: studies
    };
  }

}
