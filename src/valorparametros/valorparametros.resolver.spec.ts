import { Test, TestingModule } from '@nestjs/testing';
import { ValorparametrosResolver } from './valorparametros.resolver';
import { ValorparametrosService } from './valorparametros.service';

describe('ValorparametrosResolver', () => {
  let resolver: ValorparametrosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValorparametrosResolver, ValorparametrosService],
    }).compile();

    resolver = module.get<ValorparametrosResolver>(ValorparametrosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
