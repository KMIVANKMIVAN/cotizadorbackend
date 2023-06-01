import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioInput, UpdateUsuarioInput } from './dto/inputs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PaginationArgs, SearchArgs } from '../common/dto/args';

@Resolver(() => Usuario)
@UseGuards(JwtAuthGuard)
export class UsuariosResolver {
  constructor(private readonly usuariosService: UsuariosService) {}

  // * CREAR USUARIO
  @Mutation(() => Usuario, {
    name: 'CrearUsuario',
    description: 'Ejecuta la creacion de Usuario',
  })
  async createUsuario(
    @Args('createUsuarioInput') createUsuarioInput: CreateUsuarioInput,
    @CurrentUser('ADMINISTRADOR') usuario: Usuario,
  ): Promise<Usuario> {
    return this.usuariosService.create(createUsuarioInput);
  }

  // ? MOSTRAR USUARIOS
  @Query(() => [Usuario], {
    name: 'MostrarUsuario',
    description: 'Muestra todos los Usuarios',
  })
  async findAll(
    @CurrentUser('ADMINISTRADOR') usuario: Usuario,
  ): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }
  @Query(() => [Usuario], {
    name: 'BuscarUsuario',
    description: 'Busca Usuarios',
  })
  async buscarUsuarios(
    @CurrentUser('ADMINISTRADOR') usuario: Usuario,
    @Args() searchArgs: SearchArgs,
  ): Promise<Usuario[]> {
    return this.usuariosService.buscarUsuarios( searchArgs );
  }
  @Query(() => [Usuario], {
    name: 'BuscarCiUsuario',
    description: 'Busca por CI Usuarios',
  })
  async buscarCiUsuarios(
    @CurrentUser('ADMINISTRADOR') usuario: Usuario,
    @Args() searchArgs: SearchArgs,
  ): Promise<Usuario[]> {
    return this.usuariosService.buscarCiUsuarios( searchArgs );
  }
  @Query(() => [Usuario], {
    name: 'limitOffsetUsuario',
    description: 'Limita la cantidad de Usuarios',
  })
  async limitOffsetUsuarios(
    @CurrentUser('ADMINISTRADOR') usuario: Usuario,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Usuario[]> {
    return this.usuariosService.limitOffsetUsuarios( paginationArgs);
  }

  // ? MOSTRAR UN USUARIO
  @Query(() => Usuario, {
    name: 'BuscarMostrarUsuario',
    description: 'Busca y Muestra un Usuario',
  })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser('ADMINISTRADOR') usuario: Usuario,
  ): Promise<Usuario> {
    return this.usuariosService.findOneById(id);
  }
/*   @Query(() => Usuario, {
    name: 'BuscarMostrarUsuario',
    description: 'Busca y Muestra un Usuario',
  })
  async find(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser('ADMINISTRADOR') usuario: Usuario,
  ): Promise<Usuario> {
    return this.usuariosService.findOne(id);
  } */

  // ! ACTUALIZAR USUARIO
  /* @Mutation(() => [Usuario], {
    name: 'ActualizarUsuario',
    description: 'Actualiza un Usuario',
  })
  async updateUsuario(
    @Args('updateUsuarioInput') updateUsuarioInput: UpdateUsuarioInput,
    @CurrentUser('ADMINISTRADOR') usuario: Usuario,
  ): Promise<Usuario[]> {
    return this.usuariosService.update(
      updateUsuarioInput.id,
      updateUsuarioInput,
    );
  } */
  @Mutation(() => Usuario, {
    name: 'ActualizarUsuario',
    description: 'Actualiza un Usuario',
  })
  async updateUsuario(
    @Args('updateUsuarioInput') updateUsuarioInput: UpdateUsuarioInput,
    @CurrentUser('ADMINISTRADOR') usuario: Usuario,
  ): Promise<Usuario> {
    return this.usuariosService.update(
      updateUsuarioInput.id,
      updateUsuarioInput,
    );
  }
  @Mutation(() => Usuario, {
    name: 'ActualizarUsuarioPassword',
    description: 'Actualiza un Usuario Password',
  })
  async updateUsuarioPassword(
    @Args('updateUsuarioInput') updateUsuarioInput: UpdateUsuarioInput,
    @CurrentUser('ADMINISTRADOR') usuario: Usuario,
  ): Promise<Usuario> {
    return this.usuariosService.updateUsuarioPassword(
      updateUsuarioInput.id,
      updateUsuarioInput,
    );
  }
  @Mutation(() => Usuario, {
    name: 'ActualizarUsuarioSucursal',
    description: 'Actualiza un Usuario Sucursal',
  })
  async updateUsuarioSucursal(
    @Args('updateUsuarioInput') updateUsuarioInput: UpdateUsuarioInput,
    @CurrentUser('ADMINISTRADOR') usuario: Usuario,
  ): Promise<Usuario> {
    return this.usuariosService.updateUsuarioSucursal(
      updateUsuarioInput.id,
      updateUsuarioInput,
    );
  }
  @Mutation(() => Usuario, {
    name: 'ActualizarUsuarioActivo',
    description: 'Actualiza un Usuario Activo',
  })
  async updateUsuarioActivo(
    @Args('updateUsuarioInput') updateUsuarioInput: UpdateUsuarioInput,
    @CurrentUser('ADMINISTRADOR') usuario: Usuario,
  ): Promise<Usuario> {
    return this.usuariosService.updateUsuarioActivo(
      updateUsuarioInput.id,
      updateUsuarioInput,
    );
  }
  @Mutation(() => Usuario, {
    name: 'ActualizarUsuarioInactivo',
    description: 'Actualiza un Usuario Inactivo',
  })
  async updateUsuarioInactivo(
    @Args('updateUsuarioInput') updateUsuarioInput: UpdateUsuarioInput,
    @CurrentUser('ADMINISTRADOR') usuario: Usuario,
  ): Promise<Usuario> {
    return this.usuariosService.updateUsuarioInactivo(
      updateUsuarioInput.id,
      updateUsuarioInput,
    );
  }

  // * MOSTRAR UN USUARIO POR CORREO
  @Query(() => Usuario, {
    name: 'MostrarUsuarioPorCorreo',
    description: 'Busca y Muestra un Usuario por su Correo',
  })
  async findCorreo(
    @Args('correo', { type: () => String }) correo: string,
    @CurrentUser('Administrador') usuario: Usuario,
  ): Promise<Usuario> {
    return this.usuariosService.findCorreo(correo);
  }

  // ! ELIMINAR USUARIO NO IMPLEMENTADO
  /* @Mutation(() => Usuario)
  async removeUsuario(
    @Args('id', { type: () => ID }) id: number,
    @CurrentUser([ValidRoles.administrador]) usuario: Usuario
  ):Promise<Usuario> {
    return this.usuariosService.remove(id);
  } */
}
