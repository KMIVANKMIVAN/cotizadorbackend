import { Module } from '@nestjs/common';
import { ListaparametroService } from './listaparametro.service';
import { ListaparametroResolver } from './listaparametro.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listaparametro } from './entities/listaparametro.entity';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
@Module({
  providers: [ListaparametroResolver, ListaparametroService],
  imports: [
    TypeOrmModule.forFeature([ Listaparametro ]),
  ],
  exports: [TypeOrmModule, ListaparametroService],
})
export class ListaparametroModule {}