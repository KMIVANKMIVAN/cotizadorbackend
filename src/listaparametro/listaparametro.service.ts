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
import { CreateListaparametroInput, UpdateListaparametroInput } from './dto/inputs';
import { Listaparametro } from './entities/listaparametro.entity';

import { ParametrosService } from '../parametros/parametros.service';
@Injectable()
export class ListaparametroService {
  private logger = new Logger('ListaparametrosService');

  constructor(
    @InjectRepository(Listaparametro)
    private readonly listaparametroRepository: Repository<Listaparametro>,

  ) { }

  // * CREAR LISTAPARAMETRO
  async create(createListaparametroInput: CreateListaparametroInput): Promise<Listaparametro> {
    try {

      const newListaparametro = this.listaparametroRepository.create({ ...createListaparametroInput });

      // return await this.listaparametroRepository.save(newListaparametro);
      return await this.listaparametroRepository.save(newListaparametro)
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // ? MOSTRAR LISTAPARAMETRO
  async findAll(): Promise<Listaparametro[]> {
    try {
      return this.listaparametroRepository.find();
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // ? MOSTRAR UN LISTAPARAMETRO
  async findOneById(id: number) {
    try {
      const listaparametro = await this.listaparametroRepository.findOne({
        where: { id },
      });

      if (!listaparametro)
        throw new NotImplementedException(
          `Lista Parametro con el id: ${id} no se encuentra`,
        );

      return listaparametro;
    } catch (error) {
      throw new NotFoundException(`Lista Parametro con id: ${id} no encontrado`);
    }
  }

  // ! ACTUALIZAR LISTAPARAMETRO
  async update(id: number, updateListaparametroInput: UpdateListaparametroInput): Promise<Listaparametro> {
    try {

      const listaparametro = await this.listaparametroRepository.preload({
        ...updateListaparametroInput,
      });

      if (!listaparametro)
        throw new NotFoundException(`Lista Parametro con el id: ${id} no se encuentra`);

      return this.listaparametroRepository.save(listaparametro);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  /* async remove(id: number) {
    return `This action removes a #${id} listaparametro`;
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
