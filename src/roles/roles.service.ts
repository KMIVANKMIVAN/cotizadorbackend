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
import { CreateRolInput, UpdateRolInput } from './dto/inputs';
import { Rol } from './entities/roles.entity';

@Injectable()
export class RolService {
  private logger = new Logger('RolService');
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  // * CREAR ROL
  async create(createRolInput: CreateRolInput): Promise<Rol> {
    // const newRol = this.rolRepository.create(createRolInput);
    const newRol = this.rolRepository.create({
      ...createRolInput,
      rol: createRolInput.rol.toUpperCase(),
      tiporol: createRolInput.tiporol.toUpperCase()
    });
    
    return await this.rolRepository.save(newRol);
  }

  // ! ACTUALIZAR ROL
  async update(id: number, updateRolInput: UpdateRolInput): Promise<Rol> {
    const rol = await this.rolRepository.preload(updateRolInput);

    if (!rol)
      throw new NotFoundException(`Rol con el id: ${id} no se encuentra`);

    return this.rolRepository.save(rol);
  }

  // ? MOSTRAR ROLES
  async findAll(): Promise<Rol[]> {
    return this.rolRepository.find();
  }
  // ? MOSTRAR ROLES internos
  async rolInterno(): Promise<Rol[]> {
    try {
      const db = this.rolRepository.manager;
      const rol = await db.query(
        `SELECT * FROM public.roles
        WHERE tiporol <> 'EXTERNA'`,
      );
      return rol;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }
  // ? MOSTRAR ROLES externo
  async rolExterno(): Promise<Rol[]> {
    try {
      const db = this.rolRepository.manager;
      const rol = await db.query(
        `SELECT * FROM public.roles
        WHERE tiporol <> 'INTERNA'`,
      );
      return rol;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // ? MOSTRAR UN ROL
  async findOne(id: number): Promise<Rol> {
    const rol = await this.rolRepository.findOneBy({ id });

    if (!rol)
      throw new NotImplementedException(`Rol con el id: ${id} no se encuentra`);

    return rol;
  }

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

  /* async remove(id: number) {
    return `This action removes a #${id} rol`;
  } */
}
