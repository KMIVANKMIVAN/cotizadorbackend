import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import {
  CreateValorparametroInput,
  UpdateValorparametroInput,
} from './dto/inputs';
import { Valorparametro } from './entities/valorparametro.entity';

import { ParametrosService } from '../parametros/parametros.service';
import { CotizacionesService } from '../cotizaciones/cotizaciones.service';
import { ProductosService } from '../productos/productos.service';

@Injectable()
export class ValorparametrosService {
  private logger = new Logger('ValorparametrosService');

  constructor(
    @InjectRepository(Valorparametro)
    private readonly valorparametroRepository: Repository<Valorparametro>,
    private readonly parametrosService: ParametrosService,
    private readonly cotizacionesService: CotizacionesService,
    private readonly productosService: ProductosService,
  ) {}

  // * CREAR VALORPARAMETRO
  /* async create(createValorparametroInput: CreateValorparametroInput) {
    try {
      console.log({createValorparametroInput});
      console.log(typeof createValorparametroInput.valorDouble )
      const parametro = await this.parametrosService.findOneById(
        createValorparametroInput.parametroId,
      );
      const cotizacione = await this.cotizacionesService.findOne(
        createValorparametroInput.cotizacionId,
      );
      var a = createValorparametroInput.valorDouble

      const newValorparametro = this.valorparametroRepository.create({
        ...createValorparametroInput,
      });

      newValorparametro.parametro = parametro;
      newValorparametro.cotizacione = cotizacione;

      return await this.valorparametroRepository.save(newValorparametro);
    } catch (error) {
      this.handleDBErrors(error);
    }
  } */
  /* async create(createValorparametroInputs: CreateValorparametroInput[]) {
    console.log({createValorparametroInputs});
    
    try {

      const createdValorparametros = [];
  
      for (const createValorparametroInput of createValorparametroInputs) {
        const parametro = await this.parametrosService.findOneById(
          createValorparametroInput.parametroId,
        );
        const cotizacione = await this.cotizacionesService.findOne(
          createValorparametroInput.cotizacionId,
        );
  
        const newValorparametro = this.valorparametroRepository.create({
          ...createValorparametroInput,
        });
  
        newValorparametro.parametro = parametro;
        newValorparametro.cotizacione = cotizacione;
  
        const createdValorparametro = await this.valorparametroRepository.save(newValorparametro);
        createdValorparametros.push(createdValorparametro);
      }
  
      return createdValorparametros;
    } catch (error) {
      this.handleDBErrors(error);
    }
  } */

  async createlista(createValorparametroInputs: CreateValorparametroInput) {
    console.log({createValorparametroInputs});
    console.log(createValorparametroInputs.valores);
    
    const TIPOS = {
      LISTA: 'LISTA',
      STRING: 'STRING',
      INTEGER: 'INTEGER',
      DOUBLE: 'DOUBLE',
      ETIQUETA: 'ETIQUETA',
      BOOLEAN: 'BOOLEAN',
    }
    try {
      const createdValorparametros = [];
      const existsProducto = await this.productosService.findOne(createValorparametroInputs.productoId)
      if (!existsProducto) {
        // error ya no esta disponible ese producto
        console.log("no existe");
        // throw new NotImplementedException(
        //   `Producto con el id: ${createValorparametroInputs.productoId} no se encuentra`,
        // );
      }

      // 1. obtener todos los parametros del producto createValorparametroInputs.productoId
      const parametrosPorProducto = await this.parametrosService.findOneByProductoId(createValorparametroInputs.productoId)
      
      const valores = createValorparametroInputs.valores

      for (const item of valores) {
        const existsParametro = parametrosPorProducto.find(p => p.id === item.parametroId )

        if (existsParametro) {
          const objBase ={
            cotizacione: {
              id: createValorparametroInputs.cotizacionId
            },
            producto: {
              id: createValorparametroInputs.productoId
            },
            parametro: {
              id: existsParametro.id // valor.parametroId
            },
            valorBoolean: null,
            valorDouble: null,
            valorInt: null,
            valorLista: null,
            valorString: null
          }
          if (existsParametro.tipo ===  TIPOS.LISTA) {
            objBase.valorLista = Number(item.valor)
          }
          if (existsParametro.tipo ===  TIPOS.STRING) {
            objBase.valorString = item.valor
          }
          if (existsParametro.tipo ===  TIPOS.DOUBLE) {
            objBase.valorDouble = Number(item.valor)
          }
          if (existsParametro.tipo ===  TIPOS.BOOLEAN) {
            // objBase.valorBoolean = item.valor === 'true'
            objBase.valorBoolean = item.valor
          }
          if (existsParametro.tipo ===  TIPOS.INTEGER) {
            objBase.valorInt = Number(item.valor)
          }
          const createdValorparametro = await this.valorparametroRepository.save(objBase);
          

        }
      }

        

       

        
        
      


      //foreach de createValorparametroInputs.valores
      // hacer push a este array createdValorparametros ya con los campos directos para hacer un insert

  
  //     for (const createValorparametroInput of createValorparametroInputs) {
  //       const parametro = await this.parametrosService.findOneById(CotizacionesModule
  //         createValorparametroInput.parametroId,
  //       );
  //       const cotizacione = await this.cotizacionesService.findOne(
  //         createValorparametroInput.cotizacionId,
  //       );
  // 
  //       const newValorparametro = this.valorparametroRepository.create({
  //         ...createValorparametroInput,
  //       });
  // 
  //       newValorparametro.parametro = parametro;
  //       newValorparametro.cotizacione = cotizacione;
  // 
  //       const createdValorparametro = await this.valorparametroRepository.save(newValorparametro);
  //       createdValorparametros.push(createdValorparametro);
  //     }
  
      // return createdValorparametros;
      return true
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  // ? MOSTRAR VALORPARAMETRO
  async findAll() {
    return this.valorparametroRepository.find({
      relations: ['parametro', 'cotizacione', 'producto'],
    });
  }

  // ? MOSTRAR UN VALORPARAMETRO
  async findOne(id: number) {
    try {
      const valorparametro = await this.valorparametroRepository.findOne({
        where: { id },
        relations: ['parametro', 'cotizacione'],
      });
      if (!valorparametro)
        throw new NotImplementedException(
          `Valor Parametro con el id: ${id} no se encuentra`,
        );

      return valorparametro;
    } catch (error) {
      throw new NotFoundException(
        `Valor Parametro con id: ${id} no encontrado`,
      );
    }
  }

  // ! ACTUALIZAR VALORPARAMETRO
  async update(
    id: number,
    updateValorparametroInput: UpdateValorparametroInput,
  ) {
    try {
      throw new Error('not implemented yet')
//       console.log({ updateValorparametroInput });
//       const parametro = await this.parametrosService.findOneById(
//         updateValorparametroInput.parametroId,
//       );
//       const cotizacione = await this.cotizacionesService.findOne(
//         updateValorparametroInput.cotizacionId,
//       );
//       const valorparametro = await this.valorparametroRepository.preload({
//         ...updateValorparametroInput,
//       });
// 
//       valorparametro.parametro = parametro;
//       valorparametro.cotizacione = cotizacione;
// 
//       if (!valorparametro)
//         throw new NotFoundException(
//           `Valor Parametro con el id: ${id} no se encuentra`,
//         );
// 
//       return this.valorparametroRepository.save(valorparametro);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  /* remove(id: number) {
    return `This action removes a #${id} valorparametro`;
  } */

  // ! MANEJO DE ERRORES
  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('Key', ''));
    }

    if (error.code == 'error-001') {
      throw new BadRequestException(error.detail.replace('Key', ''));
    }

    this.logger.error(error);

    throw new InternalServerErrorException('Porfavor revise en el server logs');
  }
}
