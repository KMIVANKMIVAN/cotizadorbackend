import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { RolService } from './roles.service';
import { Rol } from './entities/roles.entity';
import { CreateRolInput, UpdateRolInput } from './dto/inputs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => Rol)
@UseGuards(JwtAuthGuard)
export class RolResolver {
  constructor(private readonly rolService: RolService) {}

  // * CREAR ROL
  @Mutation(() => Rol, {
    name: 'CrearRol',
    description: 'Ejecuta la creacion de Rol',
  })
  async createRol(
    @CurrentUser('ADMINISTRADOR') usuario: Usuario,
    @Args('createRolInput') createRolInput: CreateRolInput,
  ): Promise<Rol> {
    return this.rolService.create(createRolInput);
  }

  // ? MOSTRAR ROL
  @Query(() => [Rol], {
    name: 'MostrarRoles',
    description: 'Muestra todos los Roles',
  })
  async findAll(
    @CurrentUser('ADMINISTRADOR') usuario: Usuario,
  ): Promise<Rol[]> {
    return this.rolService.findAll();
  }
  // ? MOSTRAR ROL interno
  @Query(() => [Rol], {
    name: 'MostrarRolesInternos',
    description: 'Muestra todos los Roles',
  })
  async rolInterno(
    @CurrentUser('ADMINISTRADOR') usuario: Usuario,
  ): Promise<Rol[]> {
    return this.rolService.rolInterno();
  }
  // ? MOSTRAR ROL externo
  @Query(() => [Rol], {
    name: 'MostrarRolesExternos',
    description: 'Muestra todos los Roles',
  })
  async rolExterno(
    @CurrentUser('ADMINISTRADOR') usuario: Usuario,
  ): Promise<Rol[]> {
    return this.rolService.rolExterno();
  }

  // ? MOSTRAR UN ROL
  @Query(() => Rol, {
    name: 'BuscarMostrarRol',
    description: 'Busca y Muestra un Rol',
  })
  async findOne(
    @CurrentUser('ADMINISTRADOR') usuario: Usuario,
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Rol> {
    return this.rolService.findOne(id);
  }

  // ! ACTUALIZAR ROL
  @Mutation(() => Rol, {
    name: 'ActualizarRol',
    description: 'Actualiza un Rol',
  })
  async updateRol(
    @CurrentUser('ADMINISTRADOR') usuario: Usuario,
    @Args('updateRolInput') updateRolInput: UpdateRolInput,
  ): Promise<Rol> {
    return this.rolService.update(updateRolInput.id, updateRolInput);
  }

  // ! ELIMINAR SUCURSAL NO IMPLEMENTADO
  /* @Mutation(() => Rol)
  removeRol(
    @CurrentUser([ValidRoles.administrador]) usuario: Usuario,
    @Args('id', { type: () => ID }) id: number,
  ) {
    return this.rolService.remove(id);
  } */
}
