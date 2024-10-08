import { IUsuario } from '../../usuarios/interfaces/usuarios.interface';
import { IAgencias } from "../../agencias/interfaces/agencias.interface";
import { ICanal } from "../../canales/interfaces/canales.interface";
import { ITemas } from "../../temas/interfaces/temas.interface";
import { IClientes } from "../../clientes/interfaces/clientes.interface";

export interface IInteracciones {
  id_interaccion?: number;
  fecha: string;
  cant_mensaje?: number;
  nombre_graba?: string;
  observacion?: string;
  duracion_llamada?: string; // Guardado como string para coincidir con el tipo time without time zone
  id_usuario: number;
  id_agencia?: number;
  id_canal?: number;
  id_tema?: number;
  id_cliente?: number;
  productos_servicios: { id_producto_servicio: number | null, detalles: string }[]; // Añadir esta línea
}

// Extiende la interfaz base para incluir datos relacionados en respuestas detalladas
export interface IResponseInteracciones extends IInteracciones {
  usuario: IUsuario;
  agencia: IAgencias;
  canal: ICanal;
  tema: ITemas;
  cliente: IClientes;
}
