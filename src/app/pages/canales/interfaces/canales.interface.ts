export interface ICanal {
    id_canal?: number;  // Se hace opcional para manejar casos de creación donde el ID aún no se genera
    nombre_can?: string;  // Se permite nulo según tu esquema de base de datos
    descripcion_can?: string;  // Se permite nulo según tu esquema de base de datos
    extension_can: string;  // Requerido según tu definición, no permite valores nulos
}
