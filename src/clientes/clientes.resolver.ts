import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClientesService } from './clientes.service';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteInput, UpdateClienteInput } from './dto/inputs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => Cliente)
@UseGuards(JwtAuthGuard)
export class ClientesResolver {
  constructor(private readonly clientesService: ClientesService) {}

  // * CREAR CLIENTE
  @Mutation(() => Cliente, {
    name: 'CrearCliente',
    description: 'Ejecuta la creacion de Cliente',
  })
  async createCliente(
    @Args('createClienteInput') createClienteInput: CreateClienteInput,
  ) {
    return this.clientesService.create(createClienteInput);
  }

  // ? MOSTRAR CLIENTE
  @Query(() => [Cliente], {
    name: 'MostrarCliente',
    description: 'Muestra todos los Clientes',
  })
  async findAll(): Promise<Cliente[]> {
    return this.clientesService.findAll();
  }

  // ? MOSTRAR UN CLIENTE
  @Query(() => Cliente, {
    name: 'BuscarMostrarCliente',
    description: 'Busca y Muestra un Cliente',
  })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.clientesService.findOne(id);
  }

  // ! ACTUALIZAR CLIENTE
  @Mutation(() => Cliente, {
    name: 'ActualizarCliente',
    description: 'Actualiza un Cliente',
  })
  async updateCliente(
    @Args('updateClienteInput') updateClienteInput: UpdateClienteInput,
  ) {
    return this.clientesService.update(
      updateClienteInput.id,
      updateClienteInput,
    );
  }

  /* @Mutation(() => Cliente)
  async removeCliente(@Args('id', { type: () => Int }) id: number) {
    return this.clientesService.remove(id);
  } */
}
