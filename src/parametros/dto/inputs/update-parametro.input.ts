import { CreateParametroInput } from './create-parametro.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class UpdateParametroInput extends PartialType(CreateParametroInput) {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
