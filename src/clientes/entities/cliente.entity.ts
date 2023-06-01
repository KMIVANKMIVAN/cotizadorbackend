import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

import { Cotizacione } from '../../cotizaciones/entities/cotizacione.entity';

@Entity({ name: 'clientes' })
@ObjectType()
export class Cliente {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  ap_paterno: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  ap_materno: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  ap_casado: string;

  @Column({ nullable: false })
  @Field(() => String, { nullable: false })
  nombres: string;

  @Column({ unique: true, nullable: true })
  @Field(() => String, { nullable: true })
  numero_carnet: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  extesion: string;

  // @Column({ nullable: false })
  /* @Column({ nullable: true , type: 'date' })
  @Field(() => Date, { nullable: true })
  fechanacimiento: Date; */
  // @Column({ type: 'date' })
  // fechanacimiento: Date;

  @Column({ nullable: false })
  @Field(() => String, { nullable: false })
  fechanacimiento: string;

  /* @Column({ nullable: true })
  @Field(() => Int, { nullable: true})
  edad: number; */

  @Column({ unique: true, nullable: true })
  @Field(() => String, { nullable: true })
  correo: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  celular: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  telefono: string;

  @OneToMany(() => Cotizacione, (cotizacione) => cotizacione.cliente)
  @Field(() => [Cotizacione], { nullable: false })
  cotizaciones: Cotizacione[];
}
