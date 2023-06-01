import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosResolver } from './productos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity'
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
@Module({
  providers: [ProductosResolver, ProductosService],
  imports: [
    TypeOrmModule.forFeature([ Producto ]),
  ],
  exports: [
    TypeOrmModule,
    ProductosService
  ]
})
export class ProductosModule {}
