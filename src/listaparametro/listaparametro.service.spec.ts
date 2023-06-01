import { Test, TestingModule } from '@nestjs/testing';
import { ListaparametroService } from './listaparametro.service';

describe('ListaparametroService', () => {
  let service: ListaparametroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListaparametroService],
    }).compile();

    service = module.get<ListaparametroService>(ListaparametroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
