import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ValorparametrosService } from './valorparametros.service';
import { Valorparametro } from './entities/valorparametro.entity';
import {
  CreateValorparametroInput,
  UpdateValorparametroInput,
} from './dto/inputs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
@Resolver(() => Valorparametro)
@UseGuards(JwtAuthGuard)
export class ValorparametrosResolver {
  constructor(
    private readonly valorparametrosService: ValorparametrosService,
  ) {}

  // * CREAR VALORPARAMETRO
  /* @Mutation(() => Valorparametro, {
    name: 'CreateValorparametro',
    description: 'Ejecuta la creacion de Valorparametro',
  })
  async createValorparametro(
    @Args('createValorparametroInput')
    createValorparametroInput: CreateValorparametroInput,
  ): Promise<Valorparametro> {
    return this.valorparametrosService.create(createValorparametroInput);
  } */
  /* @Mutation(() => [Valorparametro], {
    name: 'CreateValorparametros',
    description: 'Ejecuta la creacion de Valorparametros',
  })
  async createValorparametros(
    @Args('createValorparametroInputs', { type: () => [CreateValorparametroInput] })
    createValorparametroInputs: CreateValorparametroInput[],
  ): Promise<Valorparametro[]> {
    const createdValorparametros = [];
    for (const input of createValorparametroInputs) {
      const createdValorparametro = await this.valorparametrosService.create(createValorparametroInputs);
      createdValorparametros.push(createdValorparametro);
    }
    return createdValorparametros;
  } */

  // @Mutation(() => YourMutationResponse, { // significa q el bakend retornar un boolean
  @Mutation(() => Boolean, { // significa q el bakend retornar un boolean
    name: 'CreateValorparametrosLista',
    description: 'Ejecuta la creacion de Valorparametroslista',
  })
  async createValorparametrolista(
    @Args('createValorparametroInput')
    createValorparametroInput: CreateValorparametroInput,
  // ): Promise<Valorparametro> {
  ): Promise<Boolean> {

    return this.valorparametrosService.createlista(createValorparametroInput);
  }

  // ? MOSTRAR VALORPARAMETRO
  @Query(() => [Valorparametro], {
    name: 'MostrarValorparametro',
    description: 'Muestra todos los Valorparametro',
  })
  async findAll() {
    return this.valorparametrosService.findAll();
  }

  // ? MOSTRAR UN VALORPARAMETRO
  @Query(() => Valorparametro, {
    name: 'BuscarMostrarValorparametro',
    description: 'Busca y Muestra un Valorparametro',
  })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.valorparametrosService.findOne(id);
  }

  // ! ACTUALIZAR VALORPARAMETRO
  @Mutation(() => Valorparametro, {
    name: 'ActualizarValorparametro',
    description: 'Actualiza un Valorparametro',
  })
  async updateValorparametro(
    @Args('updateValorparametroInput')
    updateValorparametroInput: UpdateValorparametroInput,
  ) {
    return this.valorparametrosService.update(
      updateValorparametroInput.id,
      updateValorparametroInput,
    );
  }

  /* @Mutation(() => Valorparametro)
  removeValorparametro(@Args('id', { type: () => Int }) id: number) {
    return this.valorparametrosService.remove(id);
  } */
}
