import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { StudyService } from '../services/study.service';
import { DataObjectService } from '../services/data-object.service';

@Module({
  controllers: [SearchController],
  providers: [StudyService, DataObjectService]
})

export class SearchModule {}