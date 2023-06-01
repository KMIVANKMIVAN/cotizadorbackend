import { CreateClienteInput } from './create-cliente.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
@InputType()
export class UpdateClienteInput extends PartialType(CreateClienteInput) {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
