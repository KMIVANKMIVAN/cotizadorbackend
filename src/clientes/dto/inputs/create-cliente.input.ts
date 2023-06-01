import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString
} from 'class-validator';
@InputType()
export class CreateClienteInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  ap_paterno?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  ap_materno?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  ap_casado?: string;

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  nombres: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  numero_carnet: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  extesion: string;

  // @Field(() => Date, { nullable: false })
  // @Field(() => Date, { nullable: false })
  // @IsString()
  // @Field()
  
  /* @IsDate()
  fechanacimiento: Date; */
  // @Field(() => String) // Cambia el tipo a String en lugar de Date
  /* @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  fechanacimiento: string; */ // Cambia el tipo a string en lugar de Date

  /* @Field(() => Int, { nullable: true })
  @IsOptional()
  edad: number; */

  // @Field(() => Date)
  // fechanacimiento: Date;
  // @Field()
  // @IsDateString()
  @Field(() => String, { nullable: false })
  @IsString()
  @IsOptional()
  fechanacimiento: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  celular?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  telefono?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEmail()
  correo: string;
}
