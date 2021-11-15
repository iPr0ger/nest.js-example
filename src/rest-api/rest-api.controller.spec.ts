import { Test, TestingModule } from '@nestjs/testing';
import { RestApiController } from './rest-api.controller';

describe('RestApiController', () => {
  let controller: RestApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestApiController],
    }).compile();

    controller = module.get<RestApiController>(RestApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
