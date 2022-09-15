export type Roles = 'admin' | 'Estudiante' | 'P'; //P = profesor y psicólogo, son equivalentes

export interface UserRegister {
    nombrecompleto: string;
    email: string;
    pass: string;
    institucion: string;
    tipousuario: Roles;
}

export interface UserRegisterResponse{
    message: string;
}