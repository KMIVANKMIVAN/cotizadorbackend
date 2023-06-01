import { CreateProductoInput } from './create-producto.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
@InputType()
export class UpdateProductoInput extends PartialType(CreateProductoInput) {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
