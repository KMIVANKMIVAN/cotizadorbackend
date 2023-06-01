import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Producto } from '../../productos/entities/producto.entity';
import { Valorparametro } from '../../valorparametros/entities/valorparametro.entity';
import { Listaparametro } from '../../listaparametro/entities/listaparametro.entity';
@Entity({ name: 'parametros' })
@ObjectType()
export class Parametro {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;

  @Column()
  @Field(() => String)
  descripcion: string;

  @Column()
  @Field(() => String)
  tipo: string;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  nrolista: number;

  @Column()
  @Field(() => Boolean)
  obligatorio: boolean;

  @Column()
  @Field(() => Int)
  fila: number;

  @Column()
  @Field(() => Int)
  columna: number;

  @ManyToOne(() => Producto, (producto) => producto.parametros, { nullable: false })
  @JoinColumn({ name: 'producto_id' })
  @Field(() => Producto)
  producto: Producto;

  @Column({ name: 'producto_id' })
  producto_id: number;



  /* @ManyToOne(() => Listaparametro, (listaparametro) => listaparametro.parametros, { nullable: false })
  @JoinColumn({ name: 'listaparametro_id' })
  @Field(() => Listaparametro)
  listaparametro: Listaparametro; */

  /* @OneToMany(() => Listaparametro, (listaparametros) => listaparametros.parametro)
  @Field(() => [Listaparametro], { nullable: false })
  listaparametros: Listaparametro[]; */

  @OneToMany(() => Valorparametro, (valorparametros) => valorparametros.parametro)
  @Field(() => [Valorparametro], { nullable: false })
  valorparametros: Valorparametro[];
}
