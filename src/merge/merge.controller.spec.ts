import { Test, TestingModule } from '@nestjs/testing';
import { MergeController } from './merge.controller';
import { MergeService } from './merge.service';

describe('MergeController', () => {
  let controller: MergeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MergeController],
      providers: [MergeService],
    }).compile();

    controller = module.get<MergeController>(MergeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
