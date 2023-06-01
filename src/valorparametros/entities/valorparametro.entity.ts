import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, Int, ID, Float, ArgsType } from '@nestjs/graphql';
import { Parametro } from '../../parametros/entities/parametro.entity';
import { Cotizacione } from '../../cotizaciones/entities/cotizacione.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity({ name: 'valorparametros' })
@ObjectType()
export class Valorparametro {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  valorString?: string;

  @Column({ nullable: true })
  @Field(() => Number, { nullable: true })
  valorInt?: number;

  @Column({ nullable: true })
  @Field(() => Number, { nullable: true })
  valorLista?: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 , nullable: true })
  @Field(() => Float, { nullable: true })
  valorDouble?: number;

  @Column({ nullable: true })
  @Field(() => Boolean, { nullable: true })
  valorBoolean?: boolean;

  @ManyToOne(() => Parametro, (parametro) => parametro.valorparametros, { nullable: false })
  @JoinColumn({ name: 'parametro_id' })
  @Field(() => Parametro)
  parametro: Parametro;

  @ManyToOne(() => Cotizacione, (cotizacione) => cotizacione.valorparametros, { nullable: false })
  @JoinColumn({ name: 'cotizacione_id' })
  @Field(() => Cotizacione)
  cotizacione: Cotizacione;

  @ManyToOne(() => Producto, (producto) => producto.valorparametros, { nullable: false })
  @JoinColumn({ name: 'producto_id' })
  @Field(() => Producto)
  producto: Cotizacione;
}

