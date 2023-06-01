import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { RolesModule } from './roles/roles.module';
import { SucursalesModule } from './sucursales/sucursales.module';

import { EmpresasModule } from './empresas/empresas.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TipoEmpresasModule } from './tipo-empresas/tipo-empresas.module';
import { AuthModule } from './auth/auth.module';

import { JwtService } from '@nestjs/jwt';

import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';
import { ClientesModule } from './clientes/clientes.module';
import { CotizacionesModule } from './cotizaciones/cotizaciones.module';
import { ProductosModule } from './productos/productos.module';
import { ValorparametrosModule } from './valorparametros/valorparametros.module';
import { ParametrosModule } from './parametros/parametros.module';
import { ListaparametroModule } from './listaparametro/listaparametro.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [AuthModule],
      inject: [JwtService],

      useFactory: async (jwtService: JwtService) => ({
        // playground: false,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        // plugins: [ApolloServerPluginLandingPageLocalDefault],
        context({ req }) {
          /* const token = req.headers.authorization?.replace('Bearer ','');
          if ( !token ) throw Error('Token needed');

          const payload = jwtService.decode( token );
          if ( !payload ) throw Error('Token not valid'); */
        },
      }),
    }),

    // TODO: configuración básica
    /* GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // debug: false,
      playground: false,
      autoSchemaFile: join( process.cwd(), 'src/schema.gql'),
      plugins: [
        ApolloServerPluginLandingPageLocalDefault
      ]
    }), */
    /* GraphQLModule.forRoot({
      driver: ApolloDriver,
      cors: {
        origin: '*',
        credentials: true,
      },
    }), */

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
      logging: ["query", "error"]
    }),

    EmpresasModule,

    SucursalesModule,

    RolesModule,

    UsuariosModule,

    TipoEmpresasModule,

    AuthModule,

    SeedModule,

    CommonModule,

    ClientesModule,

    CotizacionesModule,

    ProductosModule,

    ValorparametrosModule,

    ParametrosModule,

    ListaparametroModule,


  ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
