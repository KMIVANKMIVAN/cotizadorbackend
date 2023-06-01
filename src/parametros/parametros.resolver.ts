import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParametrosService } from './parametros.service';
import { Parametro } from './entities/parametro.entity';
import { CreateParametroInput, UpdateParametroInput } from './dto/inputs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@Resolver(() => Parametro)
@UseGuards(JwtAuthGuard)
export class ParametrosResolver {
  constructor(private readonly parametrosService: ParametrosService) { }

  // * CREAR PARAMETRO
  @Mutation(() => Parametro, {
    name: 'CrearteParametro',
    description: 'Ejecuta la creacion de Parametro',
  })
  async createParametro(
    @Args('createParametroInput') createParametroInput: CreateParametroInput,
  ) {
    return this.parametrosService.create(createParametroInput);
  }

  // ? MOSTRAR PARAMETROS
  @Query(() => [Parametro], {
    name: 'MostrarParametro',
    description: 'Muestra todos los Parametro',
  })
  async findAll(): Promise<Parametro[]> {
    return this.parametrosService.findAll();
  }

  // ? MOSTRAR UN PARAMETRO
  @Query(() => Parametro, {
    name: 'BuscarMostrarParametro',
    description: 'Busca y Muestra un Parametro',
  })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Parametro> {
    return this.parametrosService.findOneById(id);
  }

  // ! ACTUALIZAR PARAMETRO
  @Mutation(() => Parametro, {
    name: 'ActualizarParametro',
    description: 'Actualiza un Parametro',
  })
  async updateParametro(
    @Args('updateParametroInput') updateParametroInput: UpdateParametroInput,
  ) {
    return this.parametrosService.update(
      updateParametroInput.id,
      updateParametroInput,
    );
  }

  /* @Mutation(() => Parametro)
  async removeParametro(@Args('id', { type: () => Int }) id: number) {
    return this.parametrosService.remove(id);
  } */
}
