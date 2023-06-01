import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesResolver } from './clientes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity'

import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { CotizacionesModule } from '../cotizaciones/cotizaciones.module';
@Module({
  providers: [ClientesResolver, ClientesService],
  imports: [
    TypeOrmModule.forFeature([ Cliente ]),
  ],
  exports: [
    TypeOrmModule,
    ClientesService
  ]
})
export class ClientesModule {}
