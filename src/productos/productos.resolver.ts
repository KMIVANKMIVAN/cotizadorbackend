import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductosService } from './productos.service';
import { Producto } from './entities/producto.entity';
import { CreateProductoInput, UpdateProductoInput } from './dto/inputs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@Resolver(() => Producto)
@UseGuards(JwtAuthGuard)
export class ProductosResolver {
  constructor(private readonly productosService: ProductosService) {}

  // * CREAR PRODUCTO
  @Mutation(() => Producto, {
    name: 'CrearProducto',
    description: 'Ejecuta la creacion de Producto',
  })
  async createProducto(
    @Args('createProductoInput') createProductoInput: CreateProductoInput,
  ) {
    return this.productosService.create(createProductoInput);
  }

  // ? MOSTRAR PRODUCTOS
  @Query(() => [Producto], {
    name: 'MostrarProducto',
    description: 'Muestra todos los Productos',
  })
  async findAll(): Promise<Producto[]>  {
    return this.productosService.findAll();
  }

  // ? MOSTRAR UN PRODUCTO
  @Query(() => Producto, {
    name: 'BuscarMostrarProducto',
    description: 'Busca y Muestra un Producto',
  })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productosService.findOne(id);
  }

  // ! ACTUALIZAR PRODUCTO
  @Mutation(() => Producto, {
    name: 'ActualizarProducto',
    description: 'Actualiza un Producto',
  })
  async updateProducto(
    @Args('updateProductoInput') updateProductoInput: UpdateProductoInput,
  ) {
    return this.productosService.update(
      updateProductoInput.id,
      updateProductoInput,
    );
  }

  /* @Mutation(() => Producto)
  async removeProducto(@Args('id', { type: () => Int }) id: number) {
    return this.productosService.remove(id);
  } */
}
