import { CreateValorparametroInput } from './create-valorparametro.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
@InputType()
export class UpdateValorparametroInput extends PartialType(CreateValorparametroInput) {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
