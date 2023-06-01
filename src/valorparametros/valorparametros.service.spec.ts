import { Test, TestingModule } from '@nestjs/testing';
import { ValorparametrosService } from './valorparametros.service';

describe('ValorparametrosService', () => {
  let service: ValorparametrosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValorparametrosService],
    }).compile();

    service = module.get<ValorparametrosService>(ValorparametrosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
