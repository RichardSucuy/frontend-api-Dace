export interface IUsuario {
    id_usuario?: number;  // Uso de '?' para indicar que el campo puede ser opcional
    cedula_usu: string;
    nombre_usu: string;
    email_usu: string;
    user: string;
    password: string;
}