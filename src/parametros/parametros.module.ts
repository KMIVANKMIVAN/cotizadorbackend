import { Module } from '@nestjs/common';
import { ParametrosService } from './parametros.service';
import { ParametrosResolver } from './parametros.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parametro } from './entities/parametro.entity';

import { ProductosModule } from '../productos/productos.module';
import { ListaparametroModule } from '../listaparametro/listaparametro.module';
@Module({
  providers: [ParametrosResolver, ParametrosService],
  imports: [
    TypeOrmModule.forFeature([ Parametro ]),
    ProductosModule,
    ListaparametroModule
  ],
  exports: [TypeOrmModule, ParametrosService],
})
export class ParametrosModule {}
