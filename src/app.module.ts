import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { AppController } from './app.controller';
import { RestApiModule } from './rest-api/rest-api.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './configs/database/database.module';


@Module({
  imports: [
    DatabaseModule,
    SearchModule,
    RestApiModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {
  }
}
