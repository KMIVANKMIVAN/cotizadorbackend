import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateProductoInput, UpdateProductoInput } from './dto/inputs';
import { Producto } from './entities/producto.entity';
// import {  } from './entities/';
@Injectable()
export class ProductosService {
  private logger = new Logger('ProductosService');

  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) { }

  // * CREAR PRODUCTO
  async create(createProductoInput: CreateProductoInput) {
    try {
      const newProducto = this.productoRepository.create({
        ...createProductoInput,
      });
      return await this.productoRepository.save(newProducto);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // ? MOSTRAR PRODUCTOS
  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find({
      relations: ['cotizaciones'],
    });
  }

  // ? MOSTRAR UN PRODUCTO
  async findOne(id: number): Promise<Producto> {
    try {

      const producto = await this.productoRepository.findOneBy({ id });
      if (!producto)
        throw new NotImplementedException(
          `Producto con el id: ${id} no se encuentra`,
        );
      return producto;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // ! ACTUALIZAR PRODUCTO
  async update(
    id: number,
    updateProductoInput: UpdateProductoInput,
  ): Promise<Producto> {
    const producto = await this.productoRepository.preload(updateProductoInput);
    if (!producto)
      throw new NotImplementedException(
        `Producto con el id: ${id} no se encuentra`,
      );

    return this.productoRepository.save(producto);
  }

  /* remove(id: number) {
    return `This action removes a #${id} producto`;
  } */

  // ! MANEJO DE ERRORES
  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('Key', ''));
    }

    if (error.code == 'error-001') {
      throw new BadRequestException(error.detail.replace('Key', ''));
    }

    this.logger.error(error);

    throw new InternalServerErrorException('Porfavor revise en el server logs');
  }
}
