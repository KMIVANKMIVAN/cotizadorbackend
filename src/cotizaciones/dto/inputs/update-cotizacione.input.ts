import { CreateCotizacioneInput } from './create-cotizacione.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class UpdateCotizacioneInput extends PartialType(CreateCotizacioneInput) {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
