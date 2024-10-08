import { ICiudades } from "../../ciudades/interfaces/ciudades.interface";

// Interfaz básica para Agencias
export interface IAgencias {
  id_agencia: number;
  nombre_age: string;
  telefono_age: string;
  direccion_age: string;
  id_ciudad: number;
}

// Interfaz para respuestas que incluyen detalles adicionales
export interface IResponseAgencias extends IAgencias {
  ciudad: ICiudades;
}