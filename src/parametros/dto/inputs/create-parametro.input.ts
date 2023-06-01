import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
@InputType()
export class CreateParametroInput {

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  tipo: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  nrolista: number;

  @Field(() => Boolean)
  @IsNotEmpty()
  obligatorio: boolean;

  @Field(() => Int)
  @IsNotEmpty()
  fila: number;

  @Field(() => Int)
  @IsNotEmpty()
  columna: number;

  @Field(() => Int)
  @IsNotEmpty()
  productoId: number;

  /* @Field(() => Int)
  @IsNotEmpty()
  listaparametroId: number; */
}
