import { Test, TestingModule } from '@nestjs/testing';
import { CotizacionesResolver } from './cotizaciones.resolver';
import { CotizacionesService } from './cotizaciones.service';

describe('CotizacionesResolver', () => {
  let resolver: CotizacionesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CotizacionesResolver, CotizacionesService],
    }).compile();

    resolver = module.get<CotizacionesResolver>(CotizacionesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
