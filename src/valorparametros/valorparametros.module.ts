import { Module } from '@nestjs/common';
import { ValorparametrosService } from './valorparametros.service';
import { ValorparametrosResolver } from './valorparametros.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Valorparametro } from './entities/valorparametro.entity';

import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { ParametrosModule } from '../parametros/parametros.module';
import { CotizacionesModule } from '../cotizaciones/cotizaciones.module';
import { ProductosModule } from '../productos/productos.module';
@Module({
  providers: [ValorparametrosResolver, ValorparametrosService],
  imports: [
    TypeOrmModule.forFeature([ Valorparametro ]),
    ParametrosModule,
    CotizacionesModule,
    ProductosModule
  ],
  exports: [TypeOrmModule, ValorparametrosService],
})
export class ValorparametrosModule {}
