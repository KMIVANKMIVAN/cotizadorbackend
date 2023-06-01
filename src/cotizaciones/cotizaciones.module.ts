import { Module } from '@nestjs/common';
import { CotizacionesService } from './cotizaciones.service';
import { CotizacionesResolver } from './cotizaciones.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cotizacione } from './entities/cotizacione.entity';

import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { ClientesModule } from '../clientes/clientes.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { ProductosModule } from '../productos/productos.module';
@Module({
  providers: [CotizacionesResolver, CotizacionesService],
  imports: [
    TypeOrmModule.forFeature([ Cotizacione ]),
    UsuariosModule,
    ClientesModule,
    ProductosModule
  ],
  exports: [TypeOrmModule, CotizacionesService],
})
export class CotizacionesModule {}
