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
import { CreateCotizacioneInput, UpdateCotizacioneInput } from './dto/inputs';
import { Cotizacione } from './entities/cotizacione.entity';

import { UsuariosService } from '../usuarios/usuarios.service';
import { ClientesService } from '../clientes/clientes.service';
import { ProductosService } from '../productos/productos.service';
@Injectable()
export class CotizacionesService {
  private logger = new Logger('CotizacionesService');

  constructor(
    @InjectRepository(Cotizacione)
    private readonly cotizacioneRepository: Repository<Cotizacione>,
    private readonly usuariosService: UsuariosService,
    private readonly clientesService: ClientesService,
    private readonly productosService: ProductosService,
  ) {}

  // * CREAR COTIZACIONE
  async create(createCotizacioneInput: CreateCotizacioneInput) {
    try {
      const usuario = await this.usuariosService.findOneById(
        createCotizacioneInput.usuarioId,
      );
      const cliente = await this.clientesService.findOne(
        createCotizacioneInput.clienteId,
      );
      const producto = await this.productosService.findOne(
        createCotizacioneInput.productoId,
      );

      const newCotizacion = this.cotizacioneRepository.create({});

      newCotizacion.usuario = usuario;
      newCotizacion.cliente = cliente;
      newCotizacion.producto = producto;

      return await this.cotizacioneRepository.save(newCotizacion);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // ? MOSTRAR COTIZACIONE
  async findAll(): Promise<Cotizacione[]> {
    return this.cotizacioneRepository.find({
      relations: ['cliente', 'producto','usuario'],
    });
  }

  // ? MOSTRAR UN COTIZACIONE
  async findOne(id: number): Promise<Cotizacione> {
    try {
      const cotizacion = await this.cotizacioneRepository.findOne({
        where: { id },
        relations: ['cliente', 'producto', 'usuario'],
      });
      if (!cotizacion)
        throw new NotImplementedException(
          `Cotizacion con el id: ${id} no se encuentra`,
        );

      return cotizacion;
    } catch (error) {
      throw new NotFoundException(`Cotizacion con id: ${id} no encontrado`);
    }
  }

  // ! ACTUALIZAR COTIZACIONE
  async update(id: number, updateCotizacioneInput: UpdateCotizacioneInput) {
    try {
      console.log({ updateCotizacioneInput });
      const usurio = await this.usuariosService.findOneById(
        updateCotizacioneInput.usuarioId,
      );
      const cliente = await this.clientesService.findOne(
        updateCotizacioneInput.clienteId,
      );
      const producto = await this.productosService.findOne(
        updateCotizacioneInput.productoId,
      );
      const cotizacion = await this.cotizacioneRepository.preload({
        ...updateCotizacioneInput,
      });

      cotizacion.usuario = usurio;
      cotizacion.cliente = cliente;
      cotizacion.producto = producto;

      if (!cotizacion)
        throw new NotFoundException(
          `Cotizacion con el id: ${id} no se encuentra`,
        );

      return this.cotizacioneRepository.save(cotizacion);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  /* async remove(id: number) {
    return `This action removes a #${id} cotizacione`;
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
