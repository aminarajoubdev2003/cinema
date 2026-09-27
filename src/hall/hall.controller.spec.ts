import { Test, TestingModule } from '@nestjs/testing';
import { HallController } from './hall.controller.js';
import { HallService } from './hall.service.js';

describe('HallController', () => {
  let controller: HallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HallController],
      providers: [HallService],
    }).compile();

    controller = module.get<HallController>(HallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
