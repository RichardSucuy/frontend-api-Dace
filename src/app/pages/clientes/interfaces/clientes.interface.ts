import { ICiudades } from "../../ciudades/interfaces/ciudades.interface";

export interface IClientes {
  id_cliente?: number;
  cedula_cli: string;
  nombre_cli: string;
  apellido_cli: string;
  telefono_cli: string;
  socio_cli: boolean;
  nacimiento_cli: string;
  id_ciudad: number;
  nick_redes: string;
}

export interface IReponseClientes extends IClientes {
  ciudad: ICiudades;
}
