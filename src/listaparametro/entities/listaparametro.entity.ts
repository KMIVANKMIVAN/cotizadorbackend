import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Parametro } from '../../parametros/entities/parametro.entity';
@Entity({ name: 'listaparametros' })
@ObjectType()
export class Listaparametro {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;

  @Column()
  @Field(() => Int)
  nrolista: number;

  @Column()
  @Field(() => String)
  valor: string;

  @Column()
  @Field(() => String,)
  descripcion: string;

/*   @OneToMany(() => Parametro, (parametros) => parametros.listaparametro)
  @Field(() => [Parametro], { nullable: false })
  parametros: Parametro[]; */

  /* @ManyToOne(() => Parametro, (parametro) => parametro.listaparametros, { nullable: false })
  @JoinColumn({ name: 'parametro_id' })
  @Field(() => Parametro)
  parametro: Parametro; */
}