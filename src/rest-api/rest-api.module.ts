import { Module } from '@nestjs/common';
import { RestApiController } from './rest-api.controller';
import { StudyService } from '../services/study.service';
import { DataObjectService } from '../services/data-object.service';

@Module({
  controllers: [RestApiController],
  providers: [StudyService, DataObjectService]
})

export class RestApiModule {}