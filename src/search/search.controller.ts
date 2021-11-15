import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudyService } from '../services/study.service';
import { DataObjectService } from '../services/data-object.service';
import { studyIdentifiers } from '../configs/types/identifier_types';

@Controller('search')
export class SearchController {
  studyIdentifiers: Array<any>;
  constructor(
    private studyService: StudyService,
    private dataObjectService: DataObjectService
  ) {
    this.studyIdentifiers = studyIdentifiers;
  }

  @Post('/study-characteristics')
  async getByStudyCharacteristics(
    @Body('title_contains') titleContains: string,
    @Body('logical_operator') logicalOperator: string,
    @Body('topics_include') topicsInclude: string,
    @Body('filters') filters: any,
    @Body('page') page: number,
    @Body('page_size') size: number
  ){
    let studies: Array<any> = [];
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

  @Post('/specific-study')
  async getSpecificStudy(
    @Body('type') identType: string,
    @Body('value') identValue: string,
    @Body('filters') filters: any,
    @Body('page') page: number,
    @Body('page_size') size: number
  ){
    let studies: Array<any> = [];
    const identTypeObj = this.studyIdentifiers.find(i => i.id === parseInt(identType));
    const identTypeName = identTypeObj.name;
    let result = await this.studyService.getSpecificStudy(identTypeName, identValue, filters, page, size);
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

  @Post('/via-published-paper')
  async getViaPublishedPaper(
    @Body('type') searchType: string,
    @Body('value') searchValue: string,
    @Body('filters') filters: any,
    @Body('page') page: number,
    @Body('page_size') size: number
  ){
    let studies: Array<any> = [];
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

  @Get('/study/:id')
  async getSelectedStudy(
    @Param('id') id: number
  ) {
    const result = await this.studyService.getSelectedStudy(id);
    let study = result.body.hits.hits[0]._source;
    const fetchedDataObjects = await this.dataObjectService.getFetchedDataObjects(study['linked_data_objects'],
      study['linked_data_objects'].length);
    let dataObjects: Array<any> = [];
    for (let i = 0; i < fetchedDataObjects.body.hits.hits.length; i++) {
      dataObjects.push(fetchedDataObjects.body.hits.hits[i]._source);
    }
    study['linked_data_objects'] = dataObjects;
    return study;
  }

  @Post('/all-specific-study')
  async getAllSpecificStudy(
    @Body('type') identType: string,
    @Body('value') identValue: string,
    @Body('filters') filters: any,
  ){
    let studies: Array<any> = [];
    const identTypeObj = this.studyIdentifiers.find(i => i.id === parseInt(identType));
    const identTypeName = identTypeObj.name;
    let result = await this.studyService.getAllSpecificStudy(identTypeName, identValue, filters);
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
    return studies;
  }

  @Post('/all-study-characteristics')
  async getAllByStudyCharacteristics(
    @Body('title_contains') titleContains: string,
    @Body('logical_operator') logicalOperator: string,
    @Body('topics_include') topicsInclude: string,
    @Body('filters') filters: any,
  ){
    let studies: Array<any> = [];
    let result = await this.studyService.getAllByStudyCharacteristics(titleContains, logicalOperator, topicsInclude, filters);
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
    return studies;
  }

  @Post('/all-via-published-paper')
  async getAllViaPublishedPaper(
    @Body('type') searchType: string,
    @Body('value') searchValue: string,
    @Body('filters') filters: any,
  ){
    let studies: Array<any> = [];
    const resultDataObjects = await this.dataObjectService.getAllViaPublishedPaper(searchType, searchValue, filters);
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
    return studies;
  }
}
