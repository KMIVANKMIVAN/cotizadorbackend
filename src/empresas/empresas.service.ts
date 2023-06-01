import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmpresaInput, UpdateEmpresaInput } from './dto/inputs';
import { Empresa } from './entities/empresas.entity';
import { TipoEmpresaService } from '../tipo-empresas/tipo-empresas.service';

import { DataSource } from 'typeorm';

@Injectable()
export class EmpresaService {
  private logger = new Logger('EmpresasService');

  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
    private readonly tipoEmpresaService: TipoEmpresaService,
  ) {}

  // * CREAR EMPRESA
  async create(createEmpresaInput: CreateEmpresaInput): Promise<Empresa> {
    try {
      console.log("hola");

      const tipoEmpresa = await this.tipoEmpresaService.findOne(
        createEmpresaInput.tipo_empresas_id,
      );
      // const newEmpresa = this.empresaRepository.create(createEmpresaInput);
      const newEmpresa = this.empresaRepository.create({
        ...createEmpresaInput,
        razon_social: createEmpresaInput.razon_social.toUpperCase()
      });

      newEmpresa.tipo_empresa = tipoEmpresa;

      return await this.empresaRepository.save(newEmpresa);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // ! ACTUALIZAR EMPRESA
  async update(
    id: number,
    updateEmpresaInput: UpdateEmpresaInput,
  ): Promise<Empresa> {
    console.log({updateEmpresaInput});

    try {
      const tipo = await this.tipoEmpresaService.findOne(
        updateEmpresaInput.tipo_empresas_id,
      );
      const empresa = await this.empresaRepository.preload(updateEmpresaInput);
      empresa.tipo_empresa = tipo
      if (!empresa)
        throw new NotFoundException(`Empresa con el id: ${id} no se encuentra`);

      return this.empresaRepository.save(empresa);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // ? MOSTRAR EMPRESA
  async findAll(): Promise<Empresa[]> {
    return this.empresaRepository.find({
      relations: ['tipo_empresa', 'usuarios'],
    });
  }

  // ? MOSTRAR UNA EMPRESA
  async findOne(id: number): Promise<Empresa> {
    try {
      const empresa = await this.empresaRepository.findOne({
        where: { id },
        relations: ['tipo_empresa'],
      });

      if (!empresa)
        throw new NotImplementedException(
          `Empresa con el id: ${id} no se encuentra`,
        );

      return empresa;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }
  /* async findOne(id: number): Promise<Empresa> {
    try {
      const empresa = await this.empresaRepository.findOne({
        where: { id },
        relations: ['tipo_empresa', 'usuarios'],
      });

      if (!empresa)
        throw new NotImplementedException(
          `Empresa con el id: ${id} no se encuentra`,
        );

      return empresa;
    } catch (error) {
      this.handleDBErrors(error);
    }
  } */
  // ? MOSTRAR TODAS EMPRESAS MENOS VITILICIA
  async todoMenos(): Promise<Empresa[]> {
    try {
      const db = this.empresaRepository.manager;
      const empresa = await db.query(
        `SELECT * FROM public.empresas WHERE razon_social <> 'LA VITALICIA SEGUROS Y REASEGUROS DE VIDA S.A.'`,
      );
      return empresa;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }
  // ? MOSTRAR VITILICIA
  async soloVitalicia(): Promise<Empresa[]> {
    try {
      const db = this.empresaRepository.manager;
      const empresa = await db.query(
        `SELECT * FROM public.empresas WHERE razon_social = 'LA VITALICIA SEGUROS Y REASEGUROS DE VIDA S.A.'`,
      );
      return empresa;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // ! ELIMINAR EMPRESA NO IMPLEMENTADO
  /* async remove(id: number) {
    return `This action removes a #${id} empresa`;
  } */

  // ! MANEJO DE ERRORES
  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(
        error.detail.replace('El Valor del Campo', ''),
      );
    }

    if (error.code == 'error-001') {
      throw new BadRequestException(error.detail.replace('Key', ''));
    }

    this.logger.error(error);

    throw new InternalServerErrorException('Porfavor revise en el server logs');
  }
}
