export interface User {
    name: string;
    email: string;
    password: string;
}

export interface Signup_User{
    success: boolean;
    message: string;
    name: string;
    email: string;
    password: string;
}

export interface Signin_User{
    success: boolean;
    message: string;
    email: string;
    password: string;
    User: User|null;
}




