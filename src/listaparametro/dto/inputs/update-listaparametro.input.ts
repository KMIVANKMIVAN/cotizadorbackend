import { CreateListaparametroInput } from './create-listaparametro.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class UpdateListaparametroInput extends PartialType(CreateListaparametroInput) {
  @Field(() => Int)
  @IsNumber()
  id: number;
}