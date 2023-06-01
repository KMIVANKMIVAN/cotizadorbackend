import { InputType, Int, Field, Float, ArgsType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Double } from 'typeorm';
import { GraphQLScalarType } from 'graphql';

const AnyScalar = new GraphQLScalarType({
  name: 'AnyScalar',
  serialize: value => value,
});


@InputType()
class ValoresInput {
  @Field(() => Int)
  @IsNotEmpty()
  parametroId: number;

  @Field(() => AnyScalar)
  @IsNotEmpty()
  valor: any
}


@InputType()
export class CreateValorparametroInput {
  /* @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  valorString?: string;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  valorInt?: number;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  valorDouble?: number;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  valorLista?: number;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  valorBoolean?: boolean;

  @Field(() => Int)
  @IsNotEmpty()
  parametroId: number; */

  @Field(() => Int)
  @IsNotEmpty()
  cotizacionId: number;

  @Field(() => Int)
  @IsNotEmpty()
  productoId: number;

  @Field(() => [ValoresInput])
  @IsNotEmpty()
  valores: ValoresInput[];

}


