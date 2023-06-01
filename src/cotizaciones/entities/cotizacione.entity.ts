import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Producto } from '../../productos/entities/producto.entity';
import { Valorparametro } from '../../valorparametros/entities/valorparametro.entity';

@Entity({ name: 'cotizaciones' })
@ObjectType()
export class Cotizacione {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.cotizaciones, { nullable: false })
  @JoinColumn({ name: 'cliente_id' })
  @Field(() => Cliente)
  cliente: Cliente;

  @ManyToOne(() => Usuario, (usuario) => usuario.cotizaciones, { nullable: false })
  @JoinColumn({ name: 'usuario_id' })
  @Field(() => Usuario)
  usuario: Usuario;

  @ManyToOne(() => Producto, (producto) => producto.cotizaciones, { nullable: false })
  @JoinColumn({ name: 'producto_id' })
  @Field(() => Producto)
  producto: Producto;

  @OneToMany(() => Valorparametro, (valorparametros) => valorparametros.cotizacione)
  @Field(() => [Valorparametro], { nullable: false })
  valorparametros: Valorparametro[];
}
