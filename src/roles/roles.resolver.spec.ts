import { Test, TestingModule } from '@nestjs/testing';
import { RolResolver } from './roles.resolver';
import { RolService } from './roles.service';

describe('RolResolver', () => {
  let resolver: RolResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolResolver, RolService],
    }).compile();

    resolver = module.get<RolResolver>(RolResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
