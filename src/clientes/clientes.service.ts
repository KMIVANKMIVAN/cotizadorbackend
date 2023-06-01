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
import { CreateClienteInput, UpdateClienteInput } from './dto/inputs';
import { Cliente } from './entities/cliente.entity';
import { PaginationArgs, SearchArgs } from '../common/dto/args';
@Injectable()
export class ClientesService {
  private logger = new Logger('ClientesService');

  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) { }

  // * CREAR CLIENTES
  async create(createClienteInput: CreateClienteInput) {
    console.log({ createClienteInput });
    // Fecha en formato "1999-2-7"
    let fechaOriginal = createClienteInput.fechanacimiento;

    var partes = fechaOriginal.split("-");
    var anio = partes[0];
    var mes = partes[1];
    var dia = partes[2];

    // Formatear la fecha en "DD/MM/YYYY"
    var fechaFormateada = dia + "/" + mes + "/" + anio;

    try {
      if (!createClienteInput.ap_casado) {
        const newCliente = this.clienteRepository.create({
          ...createClienteInput,
          // fechanacimiento: formattedDate,
          // fechanacimiento: fecha,
          fechanacimiento: fechaFormateada,
        });
        return await this.clienteRepository.save(newCliente);
      }
      if (createClienteInput.ap_casado.startsWith('DE ')) {
        const newCliente = this.clienteRepository.create({
          ...createClienteInput,
          // fechanacimiento: formattedDate,
          // fechanacimiento: fecha,
          fechanacimiento: fechaFormateada,
        });
        return await this.clienteRepository.save(newCliente);
      }
      if (createClienteInput.ap_casado) {
        const newCliente = this.clienteRepository.create({
          ...createClienteInput,
          ap_casado: 'DE ' + createClienteInput.ap_casado,
          // fechanacimiento: formattedDate,
          // fechanacimiento: fecha,
          fechanacimiento: fechaFormateada,
        });
        return await this.clienteRepository.save(newCliente);
      }
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // ? MOSTRAR CLIENTES
  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find({
      relations: ['cotizaciones'],
    });
  }

  // ? BUSCAR UN CLIENTE
  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOneBy({ id });
    if (!cliente)
      throw new NotImplementedException(
        `Cliente con el id: ${id} no se encuentra`,
      );
    return cliente;
  }

  // ! ACTUALIZAR CLIENTE
  async update(
    id: number,
    updateClienteInput: UpdateClienteInput,
  ): Promise<Cliente> {
    console.log({ updateClienteInput });
    // console.log({updateClienteInput});

    if (!updateClienteInput.ap_casado) {
      console.log('333');

      const cliente = await this.clienteRepository.preload(updateClienteInput);
      if (!cliente)
        throw new NotImplementedException(
          `Cliente con el id: ${id} no se encuentra`,
        );

      return this.clienteRepository.save(cliente);
    }
    if (updateClienteInput.ap_casado.startsWith('DE ')) {
      console.log('111');

      const cliente = await this.clienteRepository.preload(updateClienteInput);
      if (!cliente)
        throw new NotImplementedException(
          `Cliente con el id: ${id} no se encuentra`,
        );

      return this.clienteRepository.save(cliente);
    }
    if (updateClienteInput.ap_casado) {
      console.log('222');
      const cliente = await this.clienteRepository.preload({
        ...updateClienteInput,
        ap_casado: 'DE ' + updateClienteInput.ap_casado,
      });
      if (!cliente)
        throw new NotImplementedException(
          `Cliente con el id: ${id} no se encuentra`,
        );

      return this.clienteRepository.save(cliente);
    }
  }

  // ! ELIMINAR SUCURSAL NO IMPLEMENTADO
  /* async remove(id: number) {
    return `This action removes a #${id} cliente`;
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
