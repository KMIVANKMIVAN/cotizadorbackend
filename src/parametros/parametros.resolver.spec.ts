import { Test, TestingModule } from '@nestjs/testing';
import { ParametrosResolver } from './parametros.resolver';
import { ParametrosService } from './parametros.service';

describe('ParametrosResolver', () => {
  let resolver: ParametrosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParametrosResolver, ParametrosService],
    }).compile();

    resolver = module.get<ParametrosResolver>(ParametrosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
