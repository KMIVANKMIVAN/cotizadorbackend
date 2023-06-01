import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CotizacionesService } from './cotizaciones.service';
import { Cotizacione } from './entities/cotizacione.entity';
import { CreateCotizacioneInput, UpdateCotizacioneInput } from './dto/inputs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
@Resolver(() => Cotizacione)
@UseGuards(JwtAuthGuard)
export class CotizacionesResolver {
  constructor(private readonly cotizacionesService: CotizacionesService) {}

  // * CREAR COTIZACIONE
  @Mutation(() => Cotizacione, {
    name: 'CrearCotizacione',
    description: 'Ejecuta la creacion de Cotizacione',
  })
  async createCotizacione(
    @Args('createCotizacioneInput')
    createCotizacioneInput: CreateCotizacioneInput,
  ): Promise<Cotizacione> {
    return this.cotizacionesService.create(createCotizacioneInput);
  }

  // ? MOSTRAR COTIZACIONE
  @Query(() => [Cotizacione], {
    name: 'MostrarCotizacione',
    description: 'Muestra todos los Cotizacione',
  })
  async findAll(): Promise<Cotizacione[]> {
    return this.cotizacionesService.findAll();
  }

  // ? MOSTRAR UN COTIZACIONE
  @Query(() => Cotizacione, {
    name: 'BuscarMostrarCotizacione',
    description: 'Busca y Muestra un Cotizacione',
  })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Cotizacione> {
    return this.cotizacionesService.findOne(id);
  }

  // ! ACTUALIZAR COTIZACIONE
  @Mutation(() => Cotizacione, {
    name: 'ActualizarCotizacione',
    description: 'Actualiza un Cotizacione',
  })
  async updateCotizacione(
    @Args('updateCotizacioneInput')
    updateCotizacioneInput: UpdateCotizacioneInput,
  ) {
    return this.cotizacionesService.update(
      updateCotizacioneInput.id,
      updateCotizacioneInput,
    );
  }

  /* @Mutation(() => Cotizacione)
  async removeCotizacione(@Args('id', { type: () => Int }) id: number) {
    return this.cotizacionesService.remove(id);
  } */
}
