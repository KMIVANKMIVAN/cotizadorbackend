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
import { CreateUsuarioInput, UpdateUsuarioInput } from './dto/inputs';
import { Usuario } from './entities/usuario.entity';

import * as bcrypt from 'bcrypt';

import { EmpresaService } from '../empresas/empresas.service';
import { TipoEmpresaService } from '../tipo-empresas/tipo-empresas.service';

import { RolService } from '../roles/roles.service';
import { SucursalService } from '../sucursales/sucursales.service';
import { PaginationArgs, SearchArgs } from '../common/dto/args';

@Injectable()
export class UsuariosService {
  private logger = new Logger('UsuariosService');

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly empresaService: EmpresaService,
    private readonly tipoEmpresaService: TipoEmpresaService,
    private readonly rolService: RolService,
    private readonly sucursalService: SucursalService,
  ) {}

  // * CREAR USUARIO
  async create(createUsuarioInput: CreateUsuarioInput): Promise<Usuario> {
    try {
      const empresa = await this.empresaService.findOne(
        createUsuarioInput.empresasId,
      );
      const rol = await this.rolService.findOne(createUsuarioInput.rolId);
      const sucursal = await this.sucursalService.findOne(
        createUsuarioInput.sucursalId,
      );

      //* SIN APS
      if (
        createUsuarioInput.ap_materno === null &&
        createUsuarioInput.ap_paterno === null &&
        createUsuarioInput.ap_casado === null
      ) {
        console.log('SIN APS');

        const newUsuario = this.usuarioRepository.create({
          ...createUsuarioInput,
          password: bcrypt.hashSync(createUsuarioInput.password, 10),
          nombres: createUsuarioInput.nombres.toUpperCase(),
        });

        newUsuario.empresa = empresa;
        newUsuario.rol = rol;
        newUsuario.sucursal = sucursal;

        return await this.usuarioRepository.save(newUsuario);
      }
      //! AP P
      if (
        createUsuarioInput.ap_paterno &&
        createUsuarioInput.ap_casado === null &&
        createUsuarioInput.ap_materno === null
      ) {
        console.log('AP P');

        const newUsuario = this.usuarioRepository.create({
          ...createUsuarioInput,
          password: bcrypt.hashSync(createUsuarioInput.password, 10),
          nombres: createUsuarioInput.nombres.toUpperCase(),
          ap_paterno: createUsuarioInput.ap_paterno.toUpperCase(),
        });

        newUsuario.empresa = empresa;
        newUsuario.rol = rol;
        newUsuario.sucursal = sucursal;

        return await this.usuarioRepository.save(newUsuario);
      }
      //*AP  M
      if (
        createUsuarioInput.ap_materno &&
        createUsuarioInput.ap_paterno === null &&
        createUsuarioInput.ap_casado === null
      ) {
        console.log('AP  M ');

        const newUsuario = this.usuarioRepository.create({
          ...createUsuarioInput,
          password: bcrypt.hashSync(createUsuarioInput.password, 10),
          nombres: createUsuarioInput.nombres.toUpperCase(),
          ap_materno: createUsuarioInput.ap_materno.toUpperCase(),
        });

        newUsuario.empresa = empresa;
        newUsuario.rol = rol;
        newUsuario.sucursal = sucursal;

        return await this.usuarioRepository.save(newUsuario);
      }
      //*AP P M
      if (
        createUsuarioInput.ap_materno &&
        createUsuarioInput.ap_paterno &&
        createUsuarioInput.ap_casado === null
      ) {
        console.log('AP P M');

        const newUsuario = this.usuarioRepository.create({
          ...createUsuarioInput,
          password: bcrypt.hashSync(createUsuarioInput.password, 10),
          nombres: createUsuarioInput.nombres.toUpperCase(),
          ap_materno: createUsuarioInput.ap_materno.toUpperCase(),
          ap_paterno: createUsuarioInput.ap_paterno.toUpperCase(),
        });

        newUsuario.empresa = empresa;
        newUsuario.rol = rol;
        newUsuario.sucursal = sucursal;

        return await this.usuarioRepository.save(newUsuario);
      }
      //* AP P M C CON DE_
      if (
        createUsuarioInput.ap_casado.toUpperCase().startsWith('DE ') &&
        createUsuarioInput.ap_materno &&
        createUsuarioInput.ap_paterno
      ) {
        console.log('AP P M C CON DE_');

        const newUsuario = this.usuarioRepository.create({
          ...createUsuarioInput,
          password: bcrypt.hashSync(createUsuarioInput.password, 10),
          nombres: createUsuarioInput.nombres.toUpperCase(),
          ap_materno: createUsuarioInput.ap_materno.toUpperCase(),
          ap_paterno: createUsuarioInput.ap_paterno.toUpperCase(),
          ap_casado: createUsuarioInput.ap_casado.toUpperCase(),
        });

        newUsuario.empresa = empresa;
        newUsuario.rol = rol;
        newUsuario.sucursal = sucursal;

        return await this.usuarioRepository.save(newUsuario);
      }
      //* AP P M C SIN DE_
      if (
        createUsuarioInput.ap_casado.toUpperCase() &&
        createUsuarioInput.ap_materno &&
        createUsuarioInput.ap_paterno
      ) {
        console.log('AP P M C SIN DE_');

        const newUsuario = this.usuarioRepository.create({
          ...createUsuarioInput,
          password: bcrypt.hashSync(createUsuarioInput.password, 10),
          nombres: createUsuarioInput.nombres.toUpperCase(),
          ap_materno: createUsuarioInput.ap_materno.toUpperCase(),
          ap_paterno: createUsuarioInput.ap_paterno.toUpperCase(),
          ap_casado: 'DE ' + createUsuarioInput.ap_casado.toUpperCase(),
        });

        newUsuario.empresa = empresa;
        newUsuario.rol = rol;
        newUsuario.sucursal = sucursal;

        return await this.usuarioRepository.save(newUsuario);
      }
      //! AP P  C CON DE_
      if (
        createUsuarioInput.ap_materno === null &&
        createUsuarioInput.ap_casado.toUpperCase().startsWith('DE ') &&
        createUsuarioInput.ap_paterno
      ) {
        console.log('AP P  C CON DE_');

        const newUsuario = this.usuarioRepository.create({
          ...createUsuarioInput,
          password: bcrypt.hashSync(createUsuarioInput.password, 10),
          nombres: createUsuarioInput.nombres.toUpperCase(),
          ap_paterno: createUsuarioInput.ap_paterno.toUpperCase(),
          ap_casado: createUsuarioInput.ap_casado.toUpperCase(),
        });

        newUsuario.empresa = empresa;
        newUsuario.rol = rol;
        newUsuario.sucursal = sucursal;

        return await this.usuarioRepository.save(newUsuario);
      }
      //! AP P  C SIN DE_
      if (
        createUsuarioInput.ap_materno === null &&
        createUsuarioInput.ap_casado.toUpperCase() &&
        createUsuarioInput.ap_paterno
      ) {
        console.log('AP P  C SIN DE_');

        const newUsuario = this.usuarioRepository.create({
          ...createUsuarioInput,
          password: bcrypt.hashSync(createUsuarioInput.password, 10),
          nombres: createUsuarioInput.nombres.toUpperCase(),
          ap_paterno: createUsuarioInput.ap_paterno.toUpperCase(),
          ap_casado: 'DE ' + createUsuarioInput.ap_casado.toUpperCase(),
        });

        newUsuario.empresa = empresa;
        newUsuario.rol = rol;
        newUsuario.sucursal = sucursal;

        return await this.usuarioRepository.save(newUsuario);
      }
      //* AP M  C CON DE_
      if (
        createUsuarioInput.ap_materno &&
        createUsuarioInput.ap_paterno === null &&
        createUsuarioInput.ap_casado.toUpperCase().startsWith('DE ')
      ) {
        console.log('AP M C CON DE_');

        const newUsuario = this.usuarioRepository.create({
          ...createUsuarioInput,
          password: bcrypt.hashSync(createUsuarioInput.password, 10),
          nombres: createUsuarioInput.nombres.toUpperCase(),
          ap_materno: createUsuarioInput.ap_materno.toUpperCase(),
          ap_casado: createUsuarioInput.ap_casado.toUpperCase(),
        });

        newUsuario.empresa = empresa;
        newUsuario.rol = rol;
        newUsuario.sucursal = sucursal;

        return await this.usuarioRepository.save(newUsuario);
      }
      //* AP M  C SIN DE_
      if (
        createUsuarioInput.ap_materno &&
        createUsuarioInput.ap_paterno === null &&
        createUsuarioInput.ap_casado.toUpperCase()
      ) {
        console.log('AP M C SIN DE_');

        const newUsuario = this.usuarioRepository.create({
          ...createUsuarioInput,
          password: bcrypt.hashSync(createUsuarioInput.password, 10),
          nombres: createUsuarioInput.nombres.toUpperCase(),
          ap_materno: createUsuarioInput.ap_materno.toUpperCase(),
          ap_casado: 'DE ' + createUsuarioInput.ap_casado.toUpperCase(),
        });

        newUsuario.empresa = empresa;
        newUsuario.rol = rol;
        newUsuario.sucursal = sucursal;

        return await this.usuarioRepository.save(newUsuario);
      }
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // ! ACTUALIZAR USUARIO
  async update(
    id: number,
    updateUsuarioInput: UpdateUsuarioInput,
  ): Promise<Usuario> {
    try {
      console.log({ updateUsuarioInput });

      const sucursal = await this.sucursalService.findOne(
        updateUsuarioInput.sucursalId,
      );
      const empresa = await this.empresaService.findOne(
        updateUsuarioInput.empresasId,
      );
      const rol = await this.rolService.findOne(updateUsuarioInput.rolId);
      if (updateUsuarioInput.ap_casado === null) {
        const usuario = await this.usuarioRepository.preload({
          ...updateUsuarioInput,
        });
        usuario.sucursal = sucursal;
        usuario.empresa = empresa;
        usuario.rol = rol;

        if (!usuario)
          throw new NotFoundException(
            `Usuario con el id: ${id} no se encuentra`,
          );

        // return this.usuarioRepository.save(usuario);
        return this.usuarioRepository.save(usuario);
      }
      if (updateUsuarioInput.ap_casado.toUpperCase().startsWith('DE ')) {
        const usuario = await this.usuarioRepository.preload({
          ...updateUsuarioInput,
        });
        usuario.sucursal = sucursal;
        usuario.empresa = empresa;
        usuario.rol = rol;

        if (!usuario)
          throw new NotFoundException(
            `Usuario con el id: ${id} no se encuentra`,
          );

        // return this.usuarioRepository.save(usuario);
        return this.usuarioRepository.save(usuario);
      } else {
        const usuario = await this.usuarioRepository.preload({
          ...updateUsuarioInput,
          ap_casado: 'DE ' + updateUsuarioInput.ap_casado.toUpperCase(),
        });
        usuario.sucursal = sucursal;
        usuario.empresa = empresa;
        usuario.rol = rol;

        if (!usuario)
          throw new NotFoundException(
            `Usuario con el id: ${id} no se encuentra`,
          );

        // return this.usuarioRepository.save(usuario);
        return this.usuarioRepository.save(usuario);
      }
    } catch (error) {
      this.handleDBErrors(error);
    }
  }
  async updateUsuarioPassword(
    id: number,
    updateUsuarioInput: UpdateUsuarioInput,
  ): Promise<Usuario> {
    try {
      console.log('passs');
      console.log({ updateUsuarioInput });
      const sucursal = await this.sucursalService.findOne(
        updateUsuarioInput.sucursalId,
      );
      const empresa = await this.empresaService.findOne(
        updateUsuarioInput.empresasId,
      );
      const rol = await this.rolService.findOne(updateUsuarioInput.rolId);

      const usuario = await this.usuarioRepository.preload({
        ...updateUsuarioInput,
        password: bcrypt.hashSync(updateUsuarioInput.password, 10),
      });
      usuario.sucursal = sucursal;
      usuario.empresa = empresa;
      usuario.rol = rol;

      if (!usuario)
        throw new NotFoundException(`Usuario con el id: ${id} no se encuentra`);

      return this.usuarioRepository.save(usuario);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }
  async updateUsuarioSucursal(
    id: number,
    updateUsuarioInput: UpdateUsuarioInput,
  ): Promise<Usuario> {
    try {
      console.log('sucursall');
      console.log({ updateUsuarioInput });

      const sucursal = await this.sucursalService.findOne(
        updateUsuarioInput.sucursalId,
      );
      const empresa = await this.empresaService.findOne(
        updateUsuarioInput.empresasId,
      );
      const rol = await this.rolService.findOne(updateUsuarioInput.rolId);

      const usuario = await this.usuarioRepository.preload({
        ...updateUsuarioInput,
      });
      usuario.sucursal = sucursal;
      usuario.empresa = empresa;
      usuario.rol = rol;

      if (!usuario)
        throw new NotFoundException(`Usuario con el id: ${id} no se encuentra`);

      return this.usuarioRepository.save(usuario);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }
  async updateUsuarioActivo(
    id: number,
    updateUsuarioInput: UpdateUsuarioInput,
  ): Promise<Usuario> {
    try {
      console.log('sucursall');
      console.log({ updateUsuarioInput });

      const sucursal = await this.sucursalService.findOne(
        updateUsuarioInput.sucursalId,
      );
      const empresa = await this.empresaService.findOne(
        updateUsuarioInput.empresasId,
      );
      const rol = await this.rolService.findOne(updateUsuarioInput.rolId);

      const usuario = await this.usuarioRepository.preload({
        ...updateUsuarioInput,
      });
      usuario.sucursal = sucursal;
      usuario.empresa = empresa;
      usuario.rol = rol;

      if (!usuario)
        throw new NotFoundException(`Usuario con el id: ${id} no se encuentra`);

      return this.usuarioRepository.save(usuario);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }
  async updateUsuarioInactivo(
    id: number,
    updateUsuarioInput: UpdateUsuarioInput,
  ): Promise<Usuario> {
    try {
      console.log('sucursall');
      console.log({ updateUsuarioInput });

      const sucursal = await this.sucursalService.findOne(
        updateUsuarioInput.sucursalId,
      );
      const empresa = await this.empresaService.findOne(
        updateUsuarioInput.empresasId,
      );
      const rol = await this.rolService.findOne(updateUsuarioInput.rolId);

      const usuario = await this.usuarioRepository.preload({
        ...updateUsuarioInput,
      });
      usuario.sucursal = sucursal;
      usuario.empresa = empresa;
      usuario.rol = rol;

      if (!usuario)
        throw new NotFoundException(`Usuario con el id: ${id} no se encuentra`);

      return this.usuarioRepository.save(usuario);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // ? MOSTRAR USUARIOS
  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      relations: ['empresa', 'rol', 'sucursal'],
    });
  }
  async limitOffsetUsuarios(
    paginationArgs: PaginationArgs,
  ): Promise<Usuario[]> {
    const { limit, offset } = paginationArgs;

    return this.usuarioRepository.find({
      take: limit,
      skip: offset,
      relations: ['empresa', 'rol', 'sucursal'],
    });
  }
  async buscarUsuarios(searchArgs: SearchArgs): Promise<Usuario[]> {
    const { search } = searchArgs;

    return this.usuarioRepository.find({
      relations: ['empresa', 'rol', 'sucursal'],
      where: {
        nombres: Like(`%${search}%`),
      },
    });
  }
  async buscarCiUsuarios(searchArgs: SearchArgs): Promise<Usuario[]> {
    const { search } = searchArgs;

    return this.usuarioRepository.find({
      relations: ['empresa', 'rol', 'sucursal'],
      where: {
        numero_carnet: Like(`%${search}%`),
      },
    });
  }
  async buscarCiUsuariosID(searchArgs: SearchArgs): Promise<Usuario[]> {
    const { search } = searchArgs;

    return this.usuarioRepository.find({
      relations: ['empresa', 'rol', 'sucursal'],
      where: {
        numero_carnet: Like(`%${search}%`),
      },
    });
  }

  // ? BUSCAR POR EL CORREO
  async findCorreo(correo: string): Promise<Usuario> {
    try {
      // return await this.usuarioRepository.findOneByOrFail({ id })
      const usuario = await this.usuarioRepository.findOne({
        where: { correo },
        relations: ['empresa', 'rol', 'sucursal'],
      });

      if (!usuario)
        throw new NotImplementedException(
          `Usuario con Correo: ${correo} no encontrado`,
        );

      return usuario;
    } catch (error) {
      throw new NotFoundException(`Usuario con el Correo: ${correo} no Existe`);
    }
  }

  // ? BUSCAR POR EL CORREO
  async findOneByEmail(correo: string): Promise<Usuario> {
    try {
      return await this.usuarioRepository.findOneByOrFail({ correo });
    } catch (error) {
      throw new NotFoundException(
        `El correo: ${correo} no se encontro o no existe`,
      );
    }
  }

  // * BUSCAR POR EL ID
  async findOneById(id: number): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { id },
        relations: ['empresa', 'rol', 'sucursal'],
      });

      if (!usuario)
        throw new NotImplementedException(
          `Usuario con el id: ${id} no se encuentra`,
        );

      return usuario;
    } catch (error) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }
  }
/*   async findOne(id: number): Promise<Usuario> {
    try {
      const usuario = await this.usuarioRepository.findOne({
        relations: ['empresa', 'rol', 'sucursal'],
      });

      if (!usuario)
        throw new NotImplementedException(
          `Usuario con el id: ${id} no se encuentra`,
        );

      return usuario;
    } catch (error) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }
  } */

  // ! ELIMINAR USUARIO NO IMPLEMENTADO
  /* async remove(id: number): Promise<Usuario> {
    return ;
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
