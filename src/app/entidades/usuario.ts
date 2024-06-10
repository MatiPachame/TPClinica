export interface Usuario {

    nombre:string;
     apellido:string;
     password:string;
     mail:string;
     usuario:string;
     nacimiento : Date;
     tipo_usuario:number;
     especialidad?:string;
    //  dias_atencion?: string[];
    dias_atencion?: boolean[];
    horario_desde?: number;
    horario_hasta?: number;
    especialidad_foto?: string | ArrayBuffer | null;
    perfil_foto?: string | ArrayBuffer | null;
    autorizado: number;

}
