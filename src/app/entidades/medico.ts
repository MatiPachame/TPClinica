import { Usuario } from "./usuario";

export interface Medico extends Usuario{

    especialidad: string;
    dias_atencion: string[];
    horario_atencion: string;
    especialidad_foto: string;
    perfil_foto: string;

}
