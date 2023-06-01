// * BUSCAR POR EL ID
async findOneById(id: number): Promise<Usuario> {
  try {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['empresa', 'rol', 'sucursal'],
    });

    if (!usuario)
      throw new NotImplementedException(
        `Usuario con el id: ${id} no se encuentra`,
      );

    return usuario;
  } catch (error) {
    throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
  }
}


///actualizar
console.log('holaaaaa');
      console.log({ updateUsuarioInput });
      if (
        !updateUsuarioInput.ap_casado.startsWith('DE ') &&
        updateUsuarioInput.ap_casado !== null
      ) {
        console.log('primero');
        if (updateUsuarioInput.sucursalId) {
          console.log('updateUsuarioInput.sucursalId');
          if (updateUsuarioInput.password) {
            console.log('updateUsuarioInput.password');
            const sucursal = await this.sucursalService.findOne(
              updateUsuarioInput.sucursalId,
            );
            const empresa = await this.empresaService.findOne(
              updateUsuarioInput.empresasId,
            );
            const rol = await this.rolService.findOne(updateUsuarioInput.rolId);

            const usuario = await this.usuarioRepository.preload({
              ...updateUsuarioInput,
              password: bcrypt.hashSync(updateUsuarioInput.password, 10),
              ap_casado: 'DE ' + updateUsuarioInput.ap_casado,
            });
            usuario.sucursal = sucursal;
            usuario.empresa = empresa;
            usuario.rol = rol;

            if (!usuario)
              throw new NotFoundException(
                `Usuario con el id: ${id} no se encuentra`,
              );

            // return this.usuarioRepository.save(usuario);
            return this.usuarioRepository.save(usuario);
          } else {
            console.log('else');
            const sucursal = await this.sucursalService.findOne(
              updateUsuarioInput.sucursalId,
            );
            const empresa = await this.empresaService.findOne(
              updateUsuarioInput.empresasId,
            );
            const rol = await this.rolService.findOne(updateUsuarioInput.rolId);
            const usuario = await this.usuarioRepository.preload({
              ...updateUsuarioInput,
              ap_casado: 'DE ' + updateUsuarioInput.ap_casado,
            });
            usuario.sucursal = sucursal;
            usuario.empresa = empresa;
            usuario.rol = rol;

            if (!usuario)
              throw new NotFoundException(
                `Usuario con el id: ${id} no se encuentra`,
              );

            return this.usuarioRepository.save(usuario);
          }

        } else {
          console.log('else qqq');
          if (updateUsuarioInput.password) {
            console.log('updateUsuarioInput.password');
            const sucursal = await this.sucursalService.findOne(
              updateUsuarioInput.sucursalId,
            );
            const empresa = await this.empresaService.findOne(
              updateUsuarioInput.empresasId,
            );
            const rol = await this.rolService.findOne(updateUsuarioInput.rolId);
            const usuario = await this.usuarioRepository.preload({
              ...updateUsuarioInput,
              password: bcrypt.hashSync(updateUsuarioInput.password, 10),
              ap_casado: 'DE ' + updateUsuarioInput.ap_casado,
            });
            usuario.sucursal = sucursal;
            usuario.empresa = empresa;
            usuario.rol = rol;

            if (!usuario)
              throw new NotFoundException(
                `Usuario con el id: ${id} no se encuentra`,
              );

            return this.usuarioRepository.save(usuario);
          } else {
            console.log('else yyyy');
            const sucursal = await this.sucursalService.findOne(
              updateUsuarioInput.sucursalId,
            );
            const empresa = await this.empresaService.findOne(
              updateUsuarioInput.empresasId,
            );
            const rol = await this.rolService.findOne(updateUsuarioInput.rolId);

            const usuario = await this.usuarioRepository.preload({
              ...updateUsuarioInput,
              ap_casado: 'DE ' + updateUsuarioInput.ap_casado,
            });
            usuario.sucursal = sucursal;
            usuario.empresa = empresa;
            usuario.rol = rol;

            if (!usuario)
              throw new NotFoundException(
                `Usuario con el id: ${id} no se encuentra`,
              );

            return this.usuarioRepository.save(usuario);
          }
        }
      } else {
        console.log('segundo');
        if (updateUsuarioInput.sucursalId) {
          console.log('updateUsuarioInput.sucursalId');
          if (updateUsuarioInput.password) {
            console.log('(updateUsuarioInput.password');
            const sucursal = await this.sucursalService.findOne(
              updateUsuarioInput.sucursalId,
            );
            const empresa = await this.empresaService.findOne(
              updateUsuarioInput.empresasId,
            );
            const rol = await this.rolService.findOne(updateUsuarioInput.rolId);

            const usuario = await this.usuarioRepository.preload({
              ...updateUsuarioInput,
              password: bcrypt.hashSync(updateUsuarioInput.password, 10),
            });
            usuario.sucursal = sucursal;
            usuario.empresa = empresa;
            usuario.rol = rol;

            if (!usuario)
              throw new NotFoundException(
                `Usuario con el id: ${id} no se encuentra`,
              );

            // return this.usuarioRepository.save(usuario);
            return this.usuarioRepository.save(usuario);
          } else {
            console.log('else cccc');
            const sucursal = await this.sucursalService.findOne(
              updateUsuarioInput.sucursalId,
            );
            const empresa = await this.empresaService.findOne(
              updateUsuarioInput.empresasId,
            );
            const rol = await this.rolService.findOne(updateUsuarioInput.rolId);
            const usuario = await this.usuarioRepository.preload(
              updateUsuarioInput,
            );
            usuario.sucursal = sucursal;
            usuario.empresa = empresa;
            usuario.rol = rol;

            if (!usuario)
              throw new NotFoundException(
                `Usuario con el id: ${id} no se encuentra`,
              );

            return this.usuarioRepository.save(usuario);
          }
        } else {
          console.log('else kkkkk');
          if (updateUsuarioInput.password) {
            console.log('updateUsuarioInput.password');
            const sucursal = await this.sucursalService.findOne(
              updateUsuarioInput.sucursalId,
            );
            const empresa = await this.empresaService.findOne(
              updateUsuarioInput.empresasId,
            );
            const rol = await this.rolService.findOne(updateUsuarioInput.rolId);
            const usuario = await this.usuarioRepository.preload({
              ...updateUsuarioInput,
              password: bcrypt.hashSync(updateUsuarioInput.password, 10),
            });
            usuario.sucursal = sucursal;
            usuario.empresa = empresa;
            usuario.rol = rol;

            if (!usuario)
              throw new NotFoundException(
                `Usuario con el id: ${id} no se encuentra`,
              );

            return this.usuarioRepository.save(usuario);
          } else {
            console.log('else sssssss');
            const sucursal = await this.sucursalService.findOne(
              updateUsuarioInput.sucursalId,
            );
            const empresa = await this.empresaService.findOne(
              updateUsuarioInput.empresasId,
            );
            const rol = await this.rolService.findOne(updateUsuarioInput.rolId);

            const usuario = await this.usuarioRepository.preload(
              updateUsuarioInput,
            );
            usuario.sucursal = sucursal;
            usuario.empresa = empresa;
            usuario.rol = rol;

            if (!usuario)
              throw new NotFoundException(
                `Usuario con el id: ${id} no se encuentra`,
              );

            return this.usuarioRepository.save(usuario);
          }
        }
      }
