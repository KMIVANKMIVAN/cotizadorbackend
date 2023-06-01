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
import { CreateParametroInput, UpdateParametroInput } from './dto/inputs';
import { Parametro } from './entities/parametro.entity';

import { ProductosService } from '../productos/productos.service';
import { ListaparametroService } from '../listaparametro/listaparametro.service';
@Injectable()
export class ParametrosService {
  private logger = new Logger('ParametrosService');

  constructor(
    @InjectRepository(Parametro)
    private readonly parametroRepository: Repository<Parametro>,
    /* private readonly usuariosService: UsuariosService,
    private readonly clientesService: ClientesService, */
    private readonly productosService: ProductosService,
    private readonly listaparametroService: ListaparametroService,
  ) { }

  // * CREAR PARAMETRO
  async create(createParametroInput: CreateParametroInput): Promise<Parametro> {
    console.log({createParametroInput});
    console.log("crear");
    
    try {
      const producto = await this.productosService.findOne(
        createParametroInput.productoId,
      );

      const newParametro = this.parametroRepository.create({
        ...createParametroInput,
      });
      newParametro.producto = producto;
      return await this.parametroRepository.save(newParametro);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // ? MOSTRAR PARAMETROS
  async findAll(): Promise<Parametro[]> {
    try {
      return this.parametroRepository.find({
        relations: ['producto'],
      });
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // ? MOSTRAR UN PARAMETRO
  async findOneById(id: number): Promise<Parametro> {
    try {
      const parametro = await this.parametroRepository.findOne({
        where: { id },
        relations: ['producto'],
      });

      if (!parametro)
        throw new NotImplementedException(
          `Parametro con el id: ${id} no se encuentra`,
        );

      return parametro;
    } catch (error) {
      throw new NotFoundException(`Parametro con id: ${id} no encontrado`);
    }
  }

  // ? MOSTRAR UN PARAMETRO por productoId
  async findOneByProductoId(productoId: number): Promise<Array<Parametro>> {
    try {
      const parametros = await this.parametroRepository.find({
        where: { 
          producto_id: productoId
          // producto: {
          //   id: productoId
          // }
        },
        relations: ['producto'],
      });

      if (!parametros) // TODO 
        throw new NotImplementedException(
          `Parametros con el producutoId: ${productoId} no se encuentra`,
        );

      return parametros;
    } catch (error) {
      throw new NotFoundException(`Parametros con productoid: ${productoId} no encontrado`);
    }
  }

  // ! ACTUALIZAR PARAMETRO
  async update(id: number, updateParametroInput: UpdateParametroInput): Promise<Parametro> {
    try {

      const producto = await this.productosService.findOne(
        updateParametroInput.productoId,
      );

      const parametro = await this.parametroRepository.preload({
        ...updateParametroInput,
      });

      parametro.producto = producto;

      if (!parametro)
        throw new NotFoundException(`Parametro con el id: ${id} no se encuentra`);

      return this.parametroRepository.save(parametro);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  /* async remove(id: number) {
    return `This action removes a #${id} parametro`;
  }*/

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
