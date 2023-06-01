import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ListaparametroService } from './listaparametro.service';
import { Listaparametro } from './entities/listaparametro.entity';
import { CreateListaparametroInput, UpdateListaparametroInput } from './dto/inputs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver(() => Listaparametro)
@UseGuards(JwtAuthGuard)
export class ListaparametroResolver {
  constructor(private readonly listaparametroService: ListaparametroService) { }

  // * CREAR LISTAPARAMETRO
  @Mutation(() => Listaparametro, {
    name: 'CrearteListaparametro',
    description: 'Ejecuta la creacion de Listaparametro',
  })
  async createListaparametro(
    @Args('createListaparametroInput')
    createListaparametroInput: CreateListaparametroInput,
  ): Promise<Listaparametro>  {
    return this.listaparametroService.create(createListaparametroInput);
  }

  // ? MOSTRAR LISTAPARAMETRO
  @Query(() => [Listaparametro], {
    name: 'MostrarListaparametro',
    description: 'Muestra todos los Listaparametro',
  })
  async findAll(): Promise<Listaparametro[]> {
    return this.listaparametroService.findAll();
  }

  // ? MOSTRAR UN LISTAPARAMETRO
  @Query(() => Listaparametro, {
    name: 'BuscarMostrarListaparametro',
    description: 'Busca y Muestra un Listaparametro',
  })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Listaparametro>  {
    return this.listaparametroService.findOneById(id);
  }

  // ! ACTUALIZAR LISTAPARAMETRO
  @Mutation(() => Listaparametro, {
    name: 'ActualizarListaparametro',
    description: 'Actualiza un Listaparametro',
  })
  async updateListaparametro(
    @Args('updateListaparametroInput') updateListaparametroInput: UpdateListaparametroInput
  ) {
    return this.listaparametroService.update(
      updateListaparametroInput.id,
      updateListaparametroInput
    );
  }

  /* @Mutation(() => Listaparametro)
  async removeListaparametro(@Args('id', { type: () => Int }) id: number) {
    return this.listaparametroService.remove(id);
  } */
}
