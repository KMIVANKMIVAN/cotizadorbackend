import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
@InputType()
export class CreateProductoInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  descripcion?: string;

}
