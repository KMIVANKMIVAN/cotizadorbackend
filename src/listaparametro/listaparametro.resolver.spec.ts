import { Test, TestingModule } from '@nestjs/testing';
import { ListaparametroResolver } from './listaparametro.resolver';
import { ListaparametroService } from './listaparametro.service';

describe('ListaparametroResolver', () => {
  let resolver: ListaparametroResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListaparametroResolver, ListaparametroService],
    }).compile();

    resolver = module.get<ListaparametroResolver>(ListaparametroResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
