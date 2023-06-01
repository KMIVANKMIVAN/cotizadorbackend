import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
@InputType()
export class CreateCotizacioneInput {
  @Field(() => Int)
  @IsNotEmpty()
  productoId: number;

  @Field(() => Int)
  @IsNotEmpty()
  usuarioId: number;

  @Field(() => Int)
  @IsNotEmpty()
  clienteId: number;

}
