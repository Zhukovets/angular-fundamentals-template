export interface IUser {
    email: string;
    password: string;
}

export interface INewUser extends IUser {
    name: string;
}

export interface IUserInfo extends IUser {
    name: string;
    role: string;
    id: string;
}