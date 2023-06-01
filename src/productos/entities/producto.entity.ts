import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Cotizacione } from '../../cotizaciones/entities/cotizacione.entity';
import { Parametro } from '../../parametros/entities/parametro.entity';
import { Valorparametro } from '../../valorparametros/entities/valorparametro.entity';

@Entity({ name: 'productos' })
@ObjectType()
export class Producto {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  descripcion: string;

  @OneToMany(() => Cotizacione, (cotizacione) => cotizacione.producto)
  @Field(() => [Cotizacione], { nullable: false })
  cotizaciones: Cotizacione[];

  @OneToMany(() => Parametro, (parametro) => parametro.producto)
  @Field(() => [Parametro], { nullable: false })
  parametros: Parametro[];

  @OneToMany(() => Valorparametro, (valorparametros) => valorparametros.producto)
  @Field(() => [Valorparametro], { nullable: false })
  valorparametros: Valorparametro[];

}
