import { InputType, Int, Field } from '@nestjs/graphql';
import {
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
@InputType()
export class CreateListaparametroInput {

    @Field(() => Int)
    @IsNotEmpty()
    nrolista: number;

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    valor: string;

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    descripcion: string;

}