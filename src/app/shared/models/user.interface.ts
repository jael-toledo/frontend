export type Roles = 'admin' | 'Estudiante' | 'P'; //P = profesor y psicólogo, son equivalentes

export interface User {
    email: string;
    pass: string;
}

export interface UserResponse{
    message: string;
    token: string;
    userId: number;
    userName: string;
    userEmail: string;
    userIns: string;
    userTipo: Roles;
}